const express = require('express');
const router = express.Router();
const cors = require('cors')

// Product Model
const Product = require('../../models/Products');

// @route GET api/products
// @desc Get All products
// @access Public
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/', (req,res) => {
  Product.find()
    .then(products => res.json(products))
})

router.get('/:id', (req,res) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
})

router.post('/', (req, res) => {
  const newProduct =  new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    userId: req.body.userId
  });

  newProduct.save().then(product => res.json(product))
})

// DELETE api/products/:id
router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
  .then(product => product.remove().then(() => res.json({success:true})))
  .catch(err => res.status(404).json({success:false}))
})

router.patch('/:id', (req, res) => {
  Product.update({ _id: req.params.id }, { $set:
     {title: req.body.title,
       imageUrl: req.body.imageUrl,
       description: req.body.description,
       price: req.body.price,
       category: req.body.category
     }
   })
   .then(() => res.json({success:true}))
   .catch(err => res.status(404).json({success:false}))
})


module.exports = router;
