require('dotenv').config({ path: __dirname + '/./../.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const port = process.env.PORT_NUMBER;

// Route imports
const authRouter = require('./routes/jwtRouter');
const assumptionLiabilityRouter = require('./routes/assumptionLiabilityRouter');
const purchaseDeviceRouter = require('./routes/purchaseDeviceRouter');
const serviceChangeRouter = require('./routes/serviceChangeRouter');

// Max session age
const maxSessionAge = 1000 * 60 * 60 * 24 * 1; // One day

// Configure server
const app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(
    cookieSession({
      name: 'MyTelecomApp',
      maxAge: maxSessionAge,
      secret: process.env.SESSION_SECRET,
      httpOnly: true,
      secure: false, // Set to false when testing on localhost, otherwise to "true"
      sameSite: 'lax',
    })
  );

// Routing
app.use('/api/auth', authRouter);
app.use('/api/assumptionLiability', assumptionLiabilityRouter);
app.use('/api/purchaseDevice', purchaseDeviceRouter);
app.use('/api/serviceChange', serviceChangeRouter);

// Letting dev know server started
app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});
