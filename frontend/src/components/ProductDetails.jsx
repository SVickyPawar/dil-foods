// components/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { addToWishlist, addToCart } from '../redux/actions';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === parseInt(id))
  );

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Card variant="outlined" sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderBottom: '1px solid #ddd'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">Price: ${product.price}</Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardContent>
        <Button
        variant="contained"
          size="small"
          onClick={() => dispatch(addToWishlist(product))}
        >
          Add to Wishlist
        </Button>
        <Button
        variant="contained"
        color="primary"
          size="small"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
