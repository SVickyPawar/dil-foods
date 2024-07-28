const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// GET wishlist for a user
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products').lean().exec();
    if (!wishlist) {
      return res.status(404).send({ message: "Wishlist not found" });
    }
    res.status(200).send({ wishlist: wishlist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST add product to wishlist
router.post('/:userId',
  body("productId").notEmpty().withMessage("Product ID is required"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ message: result.array() });
      }

      const { productId } = req.body;
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      let wishlist = await Wishlist.findOne({ user: req.params.userId });

      if (!wishlist) {
        wishlist = await Wishlist.create({ user: req.params.userId, products: [product._id] });
      } else {
        if (!wishlist.products.includes(product._id)) {
          wishlist.products.push(product._id);
          await wishlist.save();
        }
      }

      res.status(201).send({ wishlist: wishlist });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// DELETE remove product from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });
    if (!wishlist) {
      return res.status(404).send({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(p => p.toString() !== req.params.productId);

    if (wishlist.products.length === 0) {
      await Wishlist.findByIdAndDelete(wishlist._id);
      return res.status(200).send({ message: "Wishlist is empty, wishlist deleted" });
    } else {
      await wishlist.save();
    }

    res.status(200).send({ wishlist: wishlist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
