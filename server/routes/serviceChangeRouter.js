const express = require('express');
const router = express.Router();
const { createController } = require('../controllers/serviceChangeController.js');

router.post('/', createController);

module.exports = router;
