// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); 
const authenticateToken = require('../middleware/authMiddleware'); 

// Define valid route handlers
router.get('/', authenticateToken, cartController.getCart);
router.post('/add', authenticateToken, cartController.addToCart);
router.post('/remove', authenticateToken, cartController.removeFromCart);
router.post('/clear', authenticateToken, cartController.clearCart);

module.exports = router;
