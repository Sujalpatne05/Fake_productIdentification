const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Add seller (no auth for now)
router.post('/add', sellerController.addSeller);

// Seller product sell (no auth for now)
router.post('/sell', sellerController.sellProduct);

// Seller products query (no auth for now)
router.get('/products/:sellerId', sellerController.querySellerProducts);

module.exports = router;
