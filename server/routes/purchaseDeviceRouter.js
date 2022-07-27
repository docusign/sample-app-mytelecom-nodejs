const express = require("express");
const router = express.Router();
const purchaseDeviceRouter = require("../controllers/purchaseDeviceController.js");

router.get("/callback", (req, res) => {
  res.json({ name: "Patrick Mackle", country: "USA" });
});

module.exports = router;
