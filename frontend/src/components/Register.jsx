import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from '../axios'; 
import { Typography, TextField, Button, Box, Container, Alert } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', { username, email, password });
      setSuccess('Registration successful');
      setError('');

      // Clear input fields
      setUsername('');
      setEmail('');
      setPassword('');

      // Navigate to the login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Delay navigation to show the success message
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '600px',
          p: 3,
          marginTop: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField 
            label="Username" 
            fullWidth 
            margin="normal" 
            variant="outlined" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField 
            label="Email" 
            type="email" 
            fullWidth 
            margin="normal" 
            variant="outlined" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            variant="outlined" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }} 
            type="submit"
          >
            Register
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Box>
    </Container>
  );
};

export default Register;
