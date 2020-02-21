const express = require('express');
const router = express.Router();
const cors = require('cors')

// Product Model
const Review = require('../../models/Reviews');

// @route GET api/products
// @desc Get All products
// @access Public


router.get('/', (req,res) => {
  Review.find()
    .then(reviews => res.json(reviews))
})

router.get('/:id', (req,res) => {
  Review.findById(req.params.id)
  .then(review => res.json(review))
})

router.post('/', (req, res) => {
  const newReview =  new Review({
    text: req.body.text,
    prdId: req.body.prdId,
    userId: req.body.userId
  });

  newReview.save().then(review => res.json(review))
})

// DELETE api/reviews/:id
router.delete('/:id', (req, res) => {
  Review.findById(req.params.id)
  .then(review => review.remove().then(() => res.json({success:true})))
  .catch(err => res.status(404).json({success:false}))
})


module.exports = router;
