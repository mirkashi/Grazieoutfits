const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes (admin only)
router.post('/', protect, upload.array('images', 5), productController.createProduct);
router.put('/:id', protect, upload.array('images', 5), productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;
