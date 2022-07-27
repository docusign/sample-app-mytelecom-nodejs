const express = require("express");
const router = express.Router();
const serviceChangeRouter = require("../controllers/serviceChangeController.js");

router.get("/callback", (req, res) => {
  res.json({ name: "Patrick Mackle", country: "USA" });
});

module.exports = router;
