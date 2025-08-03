// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { Product } = require('../models'); // Correct model import

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll(); // Fetch all products from the 'Products' table
    res.json(products); // Send the products to the frontend
  } catch (error) {
    console.error(error); // Log error to the server console
    res.status(500).json({ error: error.message }); // Respond with error message
  }
});

module.exports = router;
