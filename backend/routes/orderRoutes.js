// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { verifyToken } = require('../services/auth/auth');
const adminAuth = require('../middleware/adminAuth');
const driverAuth = require('../middleware/driverAuth');
const packerAuth = require('../middleware/packerAuth');

// =============================
// CUSTOMER ROUTES
// =============================

// Create a new order (Customer only - must be logged in)
router.post('/', verifyToken, orderController.createOrder);

// =============================
// ADMIN ROUTES
// =============================

// Get all orders OR filter by status (Admin only)
router.get('/admin', adminAuth, orderController.getAllOrders);

// Update order status (Admin only)
router.patch('/admin/:orderId', adminAuth, orderController.updateOrderStatus);

// =============================
//  DRIVER ROUTES
// =============================

// Get all orders assigned to this driver
router.get('/driver', driverAuth, orderController.getDriverOrders);

// =============================
//  PACKER ROUTES
// =============================

// Get all orders assigned to this packer
router.get('/packer', packerAuth, orderController.getPackerOrders);

module.exports = router;
