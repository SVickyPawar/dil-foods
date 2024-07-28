// components/ShoppingCart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import { removeFromCart } from '../redux/actions';

const ShoppingCart = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    alert('Checkout functionality not implemented.');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '450px', // Fixed height for all cards
                overflow: 'hidden', // Prevent overflow of content
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '300px', // Fixed height for the image
                  objectFit: 'cover',
                  borderBottom: '1px solid #ddd'
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between' 
              }}>
                <div>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="h6">${product.price}</Typography>
                </div>
                <CardActions>
                  <Button variant="contained" size="small" color="secondary" onClick={() => handleRemove(product.id)}>
                    Remove
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
        Checkout
      </Button>
    </Box>
  );
};

export default ShoppingCart;
