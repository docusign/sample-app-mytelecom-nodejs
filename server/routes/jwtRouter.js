const express = require('express');
const router = express.Router();
const jwtController = require('../controllers/jwtController');

router.get('/login', jwtController.login);
router.get('/logout', jwtController.logout);
router.get('/login/callback', (req, res) => {
  res.json({ name: 'Patrick Mackle', loggedIn: false });
});

module.exports = router;
