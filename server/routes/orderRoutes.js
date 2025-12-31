const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/', orderController.createOrder);

// Protected routes (admin only)
router.get('/', protect, orderController.getAllOrders);
router.get('/:id', protect, orderController.getOrder);
router.put('/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;
