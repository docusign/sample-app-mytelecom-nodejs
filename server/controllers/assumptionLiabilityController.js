const path = require("path");
const docsPath = path.resolve(__dirname, "../documents");
const initialDocFile = "Purchase_New_Device.pdf";
const text = require("../assets/text.json");
const { sendEnvelope } = require("../envelopes/sendEnvelope");
const {
  makeEnvelope
} = require("../envelopes/assumptionLiabilityEnvelope");
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
    recipientEmail: body.recipientEmail,
    recipientName: body.recipientName,
    status: "sent",
    docFile: path.resolve(docsPath, initialDocFile),

    // New phone owner info
    recipientName: body.recipientName,
    recipientEmail: body.recipientEmail
  };

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs
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

  // Step 1: Create Envelopes
  // The first envelope in this instance is the initial device purchase envelope
  // The second envelope is to demonstrate scheduled sending, in this case, for monthly payments
  let initialEnvelope = makePurchasedEnvelope(args.initialEnvelopeArgs);
  let assumptionLiabilityEnvelope = makeEnvelope(args.)

  // Step 2: Send the envelopes to the signer
  try {
    results = await sendEnvelope(initialEnvelope, args);
  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.purchaseDeviceFirstEnvelopeError);
  }

};

module.exports = { createController };
