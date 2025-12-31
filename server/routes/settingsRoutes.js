const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/shipping-rate', settingsController.getShippingRate);

// Protected routes (admin only)
router.get('/', protect, settingsController.getSettings);
router.put('/', protect, settingsController.updateSettings);

module.exports = router;
