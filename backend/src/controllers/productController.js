const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/product.model');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST create a new product
router.post('/',
  body("id").isNumeric().withMessage("ID must be a number"),
  body("name").trim().isString().isLength({ min: 1 }).withMessage("Name is required"),
  body("price").trim().isString().isLength({ min: 1 }).withMessage("Price is required"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ message: result.array() });
      }
      const product = await Product.create(req.body);
      res.status(201).send({ product: product });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    res.status(200).send({ product: product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send({ product: product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PATCH update a product by ID
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    res.status(200).send({ product: product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
