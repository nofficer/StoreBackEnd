const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  title: {
        type: String,
        required: true
  },
  imageUrl: {
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type:Number ,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  thadate: {
    type: Date,
    default: Date.now
  },
  inStock: {
    type: Boolean,
    default: true
  }
});

module.exports = Product = mongoose.model('product', ProductSchema)
