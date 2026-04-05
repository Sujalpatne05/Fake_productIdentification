const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product add (no auth for now)
router.post('/add', productController.addProduct);

// Product verify (no auth for now)
router.get('/verify/:serial', productController.verifyProduct);

// Consumer purchase history (no auth for now)
router.get('/history/:consumerId', productController.getPurchaseHistory);

module.exports = router;