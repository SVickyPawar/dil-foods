const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  off: {
    type: String,
  }
},{
    timestamps: true,
    versionKey: false
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
