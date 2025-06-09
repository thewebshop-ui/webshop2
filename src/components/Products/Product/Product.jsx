import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Drawer,
  Box
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import InfoIcon from '@material-ui/icons/Info';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenTime, setDrawerOpenTime] = useState(null);

  const handleAddToCart = () => onAddToCart(product.id, 1);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setDrawerOpenTime(new Date());

    if (window.results) {
      window.results.clicksProductinformation = (window.results.clicksProductinformation || 0) + 1;
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);

    if (drawerOpenTime) {
      const now = new Date();
      const dwellSeconds = (now - drawerOpenTime) / 1000;

      if (window.results) {
        window.results.productInfoDwellTime = (window.results.productInfoDwellTime || 0) + dwellSeconds;
      }

      setDrawerOpenTime(null);
    }
  };

  const renderDrawerContent = () => (
    <div className={classes.drawerContent}>
      <IconButton className={classes.closeButton} onClick={handleDrawerClose}>
        X
      </IconButton>
      <Typography variant="h6" gutterBottom>Produktinformationen</Typography>

      {product.attributes && (
        <Box mt={2}>
          <Typography variant="body2" paragraph>
            Transparenz & Nachhaltigkeit auf einen Blick – informiere dich über Materialien,
            Produktionsbedingungen und Recyclingmöglichkeiten.
          </Typography>

          {Object.entries(product.attributes).map(([sectionTitle, items], index) => (
            <Box
              key={index}
              mt={2}
              p={2}
              border="1px solid #ddd"
              borderRadius={8}
              boxShadow="0 1px 4px rgba(0,0,0,0.05)"
            >
              <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 600 }}>
                {sectionTitle}
              </Typography>
              {Object.entries(items).map(([label, value], idx) => (
                <Typography key={idx} variant="body2" color="textSecondary" style={{ marginBottom: 4 }}>
                  <strong>{label}:</strong> {value}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </div>
  );

  const isTestGroup = window.results?.subjectGroup === 'test';

  return (
    <Card className={classes.root}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        />

        {isTestGroup && product.isSustainable && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: '#ffffff',
            color: '#2e7d32',
            border: '1px solid #2e7d32',
            padding: '4px 8px',
            borderRadius: '16px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}>
            <span role="img" aria-label="leaf">🌱</span> Nachhaltig
          </div>
        )}
      </div>

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Button
          className={classes.infoButton}
          startIcon={<InfoIcon />}
          onClick={handleDrawerOpen}
          variant="outlined"
          color="primary"
        >
          Produktinformationen
        </Button>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Typography variant="h6" className={classes.price}>
          {product.price.formatted}€
        </Typography>
        <IconButton
          aria-label="Add to Cart"
          onClick={handleAddToCart}
          className={classes.addToCartButton}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        {renderDrawerContent()}
      </Drawer>
    </Card>
  );
};

export default Product;
