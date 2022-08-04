require("dotenv").config({ path: `${process.env.PWD}/.env` });
const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { login } = require("./controllers/jwtController");
const port = process.env.PORT_NUMBER;

// Route imports
const authRouter = require("./routes/jwtRouter");
const assumptionLiabilityRouter = require("./routes/assumptionLiabilityRouter");
const purchaseDeviceRouter = require("./routes/purchaseDeviceRouter");
const serviceChangeRouter = require("./routes/serviceChangeRouter");

// Max session age
const maxSessionAge = 1000 * 60 * 60 * 24 * 1; // One day

// Configure server
const app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(
    cookieSession({
      name: "MyTelecomApp",
      maxAge: maxSessionAge,
      secret: process.env.SESSION_SECRET,
      httpOnly: true,
      secure: false, // Set to false when testing on localhost, otherwise to "true"
      sameSite: "lax",
    })
  );

app.get("/", (req, res) => {
  res.send("Server started");
  res.end();
});

// Test receiving a POST request
app.post("/testapi", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const result = "Response formed!\nName: " + name + "\nEmail: " + email;
  res.status(200).send(result);
});

// Routing
app.use("/auth", authRouter);
app.use("/assumptionLiability", assumptionLiabilityRouter);
app.use("/purchaseDevice", purchaseDeviceRouter);
app.use("/serviceChange", serviceChangeRouter);

// Leting dev know server started
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
