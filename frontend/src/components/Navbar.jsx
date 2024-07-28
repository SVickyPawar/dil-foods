import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const wishlistCount = useSelector((state) => state.products.wishlist.length);
  const cartCount = useSelector((state) => state.products.cart.length);
  const navigate = useNavigate(); // Initialize navigate function

  const isAuthenticated = !!localStorage.getItem('token');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/wishlist">
          <ListItemText primary={`Wishlist (${wishlistCount})`} />
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemText primary={`Cart (${cartCount})`} />
        </ListItem>
        {!isAuthenticated ? (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
          <Typography variant="h6">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>MyStore</Link>
          </Typography>
        </Box>

        {/* Menu icon for small screens */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer for small screens */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>

        {/* SearchBar centered */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: { xs: '200px', md: '300px' },
              height: { xs: '30px', md: '40px' },
              backgroundColor: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchBar />
          </Box>
        </Box>

        {/* Links for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
            Products
          </Button>
          <Button color="inherit" component={Link} to="/wishlist" sx={{ mr: 2 }}>
            Wishlist
            <Badge
              badgeContent={wishlistCount}
              color="secondary"
              sx={{ ml: 1.5 }}
            />
          </Button>
          <Button color="inherit" component={Link} to="/cart" sx={{ mr: 2 }}>
            Cart
            <Badge
              badgeContent={cartCount}
              color="secondary"
              sx={{ ml: 1.5 }}
            />
          </Button>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
