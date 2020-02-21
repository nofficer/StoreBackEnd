const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  prdId: {
    type: String,
    required: true
  },
  userId: {
    type:String,
    required: false
  }
})

module.exports = Review = mongoose.model('review', ReviewSchema)
