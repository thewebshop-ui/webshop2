import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import ThankYou from '../Modal/ThankYou';
import Cookies from 'js-cookie';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    Cookies.remove('cart');
    onEmptyCart();
  };

  const renderEmptyCart = () => (
    <div>
      <Typography variant="subtitle1">
        Es befindet sich zurzeit nichts im Warenkorb,
        <Link className={classes.link} to="/webshop2"> füge etwas hinzu</Link>!
      </Typography>
      <Button className={classes.checkoutButtonEmptyCart} size="large" variant="contained" color="primary" component={Link} to="/webshop2">
        Zurück
      </Button>
    </div>
  );


  const handleOpen = async () => {
    const startTime = new Date(window.results.startTime);
    const endTime = new Date();
  
    const products = cart.line_items.map((item) => ({
      product_id: item.name,
      product_quantity: item.quantity,
      product_price: item.price.formatted,
      categories: item.categories || []
    }));
  
    const payload = {
      participant_id: window.results.id,
      group_id: window.results.subjectGroup,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: (endTime.getTime() - startTime.getTime()) / 1000,
      recorded_date: endTime.toISOString().split("T")[0],
      finished: "True",
      age: window.results.age,
      gender: window.results.gender,
      income: window.results.income,
      clothing: window.results.clothing,
      budget: window.results.budget,
  
  
      // Cart summary
      total_items: cart.total_items,
      subtotal: cart.subtotal.formatted,
      products: products,
  
      // 🎯 Survey data (fill these dynamically or with a modal before)
    
      totalSpent: cart.subtotal.formatted,
      itemsBought: cart.total_items,
      sustainableRatio: 0.5,            // Set dynamically if tracked
      totalTimeInShop: (endTime.getTime() - startTime.getTime()) / 1000,
      cartCategories: Array.from(new Set(products.flatMap(p => p.categories))),
      cartSizes: Array.from(new Set(products.flatMap(p => p.categories))), // Replace with size logic if needed
      clicks: window.results.clicksProductinformation || 0,
      dwellTime: window.results.productInfoDwellTime || 0
    };
  
    try {
      const response = await fetch('https://webshop-api-cyan.vercel.app/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        handleClickOpen();
      } else {
        alert('Data transfer failed!');
      }
    } catch (error) {
      console.error("❌ Error posting survey:", error);
      alert("Data transfer error!");
    }
  };
  
  /*
  const handleOpen = async () => {
    const products = cart.line_items.map((item) => ({
      product_id: item.name,
      product_quantity: item.quantity,
      product_price: item.price.formatted
    }));

    const payload = {
      participant_id: window.results.id,
      group_id: window.results.eEfficiencyGroup,
      startTime: window.results.startTime,
      endTime: new Date().toTimeString(),
      duration: (new Date().getTime() - window.results.startTime.getTime()) / 1000,
      recorded_date: new Date().toDateString(),
      finished: "True",
      filter_usage_color: window.results.filterUsageColor,
      filter_usage_efficiency: window.results.filterUsageEfficiency,
      save_electricity_counter: window.results.saveElectricityCounter,
      e_efficiency_counter: window.results.eEfficiencyCounter,
      total_items: cart.total_items,
      subtotal: cart.subtotal.formatted,
      products: products
    };

    const response = await fetch('https://eu-central-1.aws.data.mongodb-api.com/app/application-0-yfsqbzt/endpoint/postSurvey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      handleClickOpen();
    } else {
      alert('Data transfer failed!');
    }
  };*/

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Summe: {cart.subtotal.formatted.toFixed(2)}€</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" variant="contained" color="primary" component={Link} to="/webshop2">
            Zurück
          </Button>
          <Button className={classes.emptyButton} size="large" variant="contained" color="primary" onClick={onEmptyCart}>
            Warenkorb leeren
          </Button>
          <Button className={classes.checkoutButton} size="large" variant="contained" color="secondary" onClick={handleOpen}>
            Jetzt kaufen
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return 'Loading...';

  return (
    <Container>
      <ThankYou open={open} setOpen={setOpen} />
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Dein Warenkorb</Typography>
      {cart.line_items.length === 0 ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
