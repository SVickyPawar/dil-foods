import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
