const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { verifyToken } = require('../services/auth/auth');
//const orderController = require('../controller/orderController');
const adminAuth = require('../middleware/adminAuth');


router.get('/', orderController.getAllOrders);
router.post('/', verifyToken, orderController.createOrder); // ✅ Protected route
router.patch('/:orderId', orderController.updateOrderStatus);

// Admin-only: Get all orders
router.get('/orders', adminAuth, orderController.getAllOrders);

// Admin-only: Update order status
router.patch('/orders/:id', adminAuth, orderController.updateOrderStatus);

module.exports = router;
