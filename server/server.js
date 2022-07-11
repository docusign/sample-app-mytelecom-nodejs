require("dotenv").config({ path: `${process.env.PWD}/.env` });
const express = require("express");
const port = 8000;
const { login } = require("./controllers/jwtController");

// Route imports
const authRouter = require("./routes/jwtRouter");

// Configure server
const app = express();

app.get("/", (req, res) => {
  res.send("Server started");
  res.end();
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

// Routing
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
