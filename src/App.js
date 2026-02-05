import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Products, Cart, Filters } from './components';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

window.results = {
  id: uuidv4(),
  group: "ANFLVF",
  subjectGroup: Math.random() < 0.5 ? "test" : "control",
  startTime: new Date(),
  clicksProductinformation: 0,
  productInfoDwellTime: 0
};

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState({ line_items: [], total_items: 0, subtotal: { formatted: 0 } });

  const [filterState, setFilterState] = useState({
    targetGroups: [],
    productTypes: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const savedCart = Cookies.get('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const syncedCart = updateCartWithLatestProducts(parsedCart, allProducts);
        setCart(updateCartTotal(syncedCart));
      } catch (e) {
        console.error('Invalid cart cookie', e);
      }
    }
  }, [allProducts]);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://webshop-api-cyan.vercel.app/api/products");
      const text = await response.text();
      console.log("🧾 Raw response:", text);

      const data = JSON.parse(text);
      setProducts(data.products);
      setAllProducts(data.products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  const updateCartWithLatestProducts = (savedCart, currentProducts) => {
    const updatedItems = savedCart.line_items.map((item) => {
      const updatedProduct = currentProducts.find(p => p.id === item.product_id);
      return updatedProduct
        ? {
            ...item,
            name: updatedProduct.name,
            image: updatedProduct.image,
            categories: updatedProduct.categories,
            price: { formatted: updatedProduct.price.formatted }
          }
        : item;
    });

    return { ...savedCart, line_items: updatedItems };
  };

  const filterProducts = ({ targetGroups = [], productTypes = [] }) => {
    setFilterState({ targetGroups, productTypes });

    const filtered = allProducts.filter((product) => {
      const productCategories = product.categories || [];

      const matchesTargetGroup =
        targetGroups.length === 0 ||
        targetGroups.some(group => productCategories.includes(group));

      const matchesProductType =
        productTypes.length === 0 ||
        productTypes.some(type => productCategories.includes(type));

      return matchesTargetGroup && matchesProductType;
    });

    console.log("Filtered products:", filtered, "with filters:", { targetGroups, productTypes });
    setProducts(filtered);
  };

  const handleAddToCart = (productId, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.line_items.find((item) => item.product_id === productId);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevCart.line_items.map((item) =>
          item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const product = allProducts.find((p) => p.id === productId);
        if (!product) return prevCart;

        const newItem = {
          id: `item_${productId}`,
          product_id: productId,
          name: product.name,
          quantity,
          price: { formatted: product.price.formatted },
          image: product.image,
          categories: product.categories || []
        };

        updatedItems = [...prevCart.line_items, newItem];
      }

      return updateCartTotal({ ...prevCart, line_items: updatedItems });
    });
  };

  const handleUpdateCartQty = (lineItemId, quantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.line_items.map((item) =>
        item.id === lineItemId ? { ...item, quantity } : item
      );
      return updateCartTotal({ ...prevCart, line_items: updatedItems });
    });
  };

  const handleRemoveFromCart = (lineItemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.line_items.filter((item) => item.id !== lineItemId);
      return updateCartTotal({ ...prevCart, line_items: updatedItems });
    });
  };

  const handleEmptyCart = () => {
    Cookies.remove('cart');
    setCart(updateCartTotal({ ...cart, line_items: [] }));
  };

  const updateCartTotal = (updatedCart) => {
    const totalItems = updatedCart.line_items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = updatedCart.line_items.reduce((acc, item) => acc + item.price.formatted * item.quantity, 0);

    return {
      ...updatedCart,
      total_items: totalItems,
      subtotal: {
        formatted: subtotal
      }
    };
  };

  const theme = createMuiTheme({
    typography: {
      h5: { fontWeight: 500 },
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(',')
    }
  });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
          <Switch>
            <Route exact path="/webshop2">
              <Filters filterProducts={filterProducts} keys={filterState} />
              <Products products={products} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
