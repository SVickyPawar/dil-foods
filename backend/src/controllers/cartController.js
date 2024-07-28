const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// GET cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('products.product').lean().exec();
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    res.status(200).send({ cart: cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST add product to cart
router.post('/:userId',
  body('products').isArray().withMessage('Products should be an array'),
  body('products.*.product').notEmpty().withMessage('Product ID is required'),
  body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity should be at least 1'),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ message: result.array() });
      }

      const { products } = req.body;
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Validate each product and quantity
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).send({ message: `Product with ID ${item.product} not found` });
        }
      }

      let cart = await Cart.findOne({ user: req.params.userId });

      if (!cart) {
        cart = await Cart.create({ user: req.params.userId, products });
      } else {
        // Update existing cart
        for (const item of products) {
          const productIndex = cart.products.findIndex(p => p.product.toString() === item.product);
          if (productIndex > -1) {
            cart.products[productIndex].quantity += item.quantity;
          } else {
            cart.products.push(item);
          }
        }
        await cart.save();
      }

      res.status(201).send({ cart });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// DELETE remove product from cart
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);

    if (cart.products.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).send({ message: "Cart is empty, cart deleted" });
    } else {
      await cart.save();
    }

    res.status(200).send({ cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
