const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', adminController.login);
router.post('/create', adminController.createAdmin); // Should be protected in production

// Protected routes
router.get('/profile', protect, adminController.getProfile);
router.put('/change-password', protect, adminController.changePassword);

module.exports = router;
