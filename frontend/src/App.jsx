import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { setAllProducts } from './redux/actions';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import ShoppingCart from './components/ShoppingCart';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import productsData from './products.json';
import ProductDetails from './components/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(setAllProducts(productsData));
    }, [dispatch]);

    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<ProtectedRoute element={<ProductCard products={products} />} />} />
                    <Route path="/cart" element={<ProtectedRoute element={<ShoppingCart />} />} />
                    <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />
                    <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetails />} />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
