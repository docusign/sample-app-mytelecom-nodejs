const path = require("path");
const docsPath = path.resolve(__dirname, "../documents");
const docFile = "Purchase_New_Device.pdf";
const text = require("../assets/text.json");
const { sendEnvelope } = require("../envelopes/sendEnvelope");
const { makeEnvelope } = require("../envelopes/purchaseDeviceEnvelope");
const { checkToken } = require("./jwtController");

/**
 * Controller that creates and sends an envelope to the signer.
 */
const createController = async (req, res) => {
  // Check the access token, which will also update the token
  // if it is expired
  await checkToken(req);

  // Construct arguments
  const { body } = req;
  const envelopeArgs = {
    signerEmail: body.signerEmail,
    signerName: body.signerName,
    status: "sent",
    docFile: path.resolve(docsPath, docFile),

    // Payments
    gatewayAccountId: process.env.PAYMENT_GATEWAY_ACCOUNT_ID,
    gatewayName: process.env.PAYMENT_GATEWAY_NAME,
    gatewayDisplayName: process.env.PAYMENT_GATEWAY_DISPLAY_NAME,

    // Information regarding what selections the signer has made
    signerPhoneSelection: body.signerPhoneSelection,
    signerInsuranceSelection: body.signerInsuranceSelection,
    signerDownPayment: body.signerDownPayment,
  };
  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs,
  };
  let results = null;

  // Before doing anything with envelopes
  // first make sure the .env variables are set up
  try {
    if (
      !process.env.PAYMENT_GATEWAY_ACCOUNT_ID ||
      process.env.PAYMENT_GATEWAY_ACCOUNT_ID ==
        "{YOUR_PAYMENT_GATEWAY_ACCOUNT_ID}" ||
      !process.env.PAYMENT_GATEWAY_NAME ||
      !process.env.PAYMENT_GATEWAY_DISPLAY_NAME
    ) {
      throw error;
    }
  } catch (error) {
    throw new Error(text.apiErrors.paymentConfigsUndefined);
  }

  // Step 1: Create Envelope
  let envelope = makeEnvelope(args.envelopeArgs);

  // Step 2: Send the envelope to signer
  try {
    results = await sendEnvelope(envelope, args);
  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.purchaseDeviceError);
  }

  if (results) {
    req.session.envelopeId = results.envelopeId;
    res.status(200).send(text.envelope.envelopeSent);
  }
};

module.exports = { createController };
