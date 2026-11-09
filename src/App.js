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
