const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const wishlistController = require('./controllers/wishlistController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Route Handlers
app.use("/users",userController);
app.use('/products', productController);
app.use('/cart', cartController);
app.use('/wishlist', wishlistController);

module.exports = app;