const express = require('express');
const router = express.Router();
const { createController } = require('../controllers/purchaseDeviceController');

router.post('/', createController);

module.exports = router;
