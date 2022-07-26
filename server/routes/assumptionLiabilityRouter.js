const express = require("express");
const router = express.Router();
const assumptionLiabilityRouter = require("../controllers/assumptionLiabilityController");

router.get("/callback", (req, res) => {
  res.json({ name: "Patrick Mackle", country: "USA" });
});

module.exports = router;
