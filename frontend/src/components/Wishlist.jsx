// components/Wishlist.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import { removeFromWishlist } from '../redux/actions';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.products.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      <Grid container spacing={2}>
        {wishlist.map((product) => (
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
                  <Button size="small" color="secondary" onClick={() => handleRemove(product.id)}>
                    Remove
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
