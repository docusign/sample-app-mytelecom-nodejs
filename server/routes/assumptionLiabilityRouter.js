const express = require('express');
const router = express.Router();

const { createController } = require('../controllers/assumptionLiabilityController');
router.post('/', createController);

module.exports = router;
