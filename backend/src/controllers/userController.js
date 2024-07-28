const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.model');
const secret = process.env.JWT_SECRET; 

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).send({ users: users });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST register a new user
router.post('/register',
  body("username").trim().isString().isLength({ min: 2, max: 30 }).withMessage("Username should be between 2 and 30 characters").bail().custom(async (value) => {
    const username = await User.findOne({ username: value });
    if (username) {
      throw new Error("Username already taken");
    }
  }),
  body("email").trim().isEmail().withMessage("Enter a valid email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("User already exists");
    }
    return true;
  }),
  body("password").isStrongPassword().withMessage("Enter a strong password"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ message: result.array() });
      }

      const { username, email, password } = req.body;

      // Create and save the new user
      const user = await User.create({ username, email, password });
      res.status(201).send({ user: user });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// POST login a user
router.post('/login',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ message: result.array() });
      }

      const { email, password } = req.body;

      console.log(`Attempting to log in user with email: ${email}`);

      // Find the user by email
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }

      console.log('User found:', user);

      // Print the hashed password from the database
      console.log('Stored password hash:', user.password);

      // Compare the provided password with the hashed password
      const isMatch = await user.comparePassword(password);

      // Print the provided password and its hash
      console.log('Provided password:', password);
      console.log('Password match:', isMatch);

      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });

      res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PATCH update user details
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
