const express = require("express");
const router = express.Router();
const { createController } = require("../controllers/purchaseDeviceController");

router.post("/", createController); // TODO: add next or something here?

// Test receiving a GET request
router.get("/callback", (req, res) => {
  res.json({ name: "Patrick Mackle", type: "Purchase Device Applicant" });
});
// Test receiving a POST request
router.post("/test", (req, res) => {
  const name = req.body.signerName;
  const email = req.body.signerEmail;
  const result =
    "TEST: Server formed response:\nName: " + name + "\nEmail: " + email;
  res.status(200).send(result);
});

module.exports = router;
