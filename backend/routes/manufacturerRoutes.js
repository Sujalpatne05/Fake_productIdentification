const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');

// Manufacturer register (no auth for now)
router.post('/add', manufacturerController.registerManufacturer);

// Manufacturer to seller product transfer (no auth for now)
router.post('/sell', manufacturerController.transferToSeller);

// Get sellers for manufacturer (no auth for now)
router.get('/sellers/:manufacturerId', manufacturerController.getSellers);

module.exports = router;
