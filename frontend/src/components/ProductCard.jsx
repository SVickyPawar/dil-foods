// components/ProductCard.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWishlist, addToCart } from '../redux/actions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Grid container spacing={3} marginTop={2}>
      {products.map((product,i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card 
            variant="outlined" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              cursor: 'pointer',
              height: '450px', // Fixed height for all cards
              overflow: 'hidden', // Prevent overflow of content
            }}
            onClick={() => handleViewDetails(product)}
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
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 2 
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling up to Card
                    dispatch(addToWishlist(product));
                  }}
                  endIcon={<FavoriteBorderIcon />}
                  sx={{ flex: 1, mr: 1 }}
                >
                  Add to Wishlist
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling up to Card
                    dispatch(addToCart(product));
                  }}
                  endIcon={<AddCircleOutlineIcon />}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
