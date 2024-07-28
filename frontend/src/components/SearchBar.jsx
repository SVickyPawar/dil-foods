// components/SearchBar.js
import React, { useState } from 'react';
import { Box, InputBase, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts) || [];

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery === '') {
      dispatch(setProducts(allProducts)); // Reset to all products when search query is empty
    } else {
      console.log(allProducts,"all products")
      const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredProducts,"filtered products")
      dispatch(setProducts(filteredProducts));
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderRadius: '4px', 
        p: 1, 
        width: '100%', 
        maxWidth: '300px', 
        height: '40px', 
        boxSizing: 'border-box'
      }}
    >
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
      <InputBase
        placeholder="Search Products"
        value={query}
        onChange={handleSearch}
        sx={{ ml: 1, flex: 1 }}
      />
    </Box>
  );
};

export default SearchBar;
