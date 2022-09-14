const path = require("path");
const docsPath = path.resolve(__dirname, "../documents");
const initialDocFile = "Purchase_New_Device.pdf";
const monthlyPaymentDocFile = "Purchase_New_Device_Monthly_Payment.pdf";
const text = require("../assets/text.json");
const { sendEnvelope } = require("../envelopes/sendEnvelope");
const {
  makePurchasedEnvelope,
  makeScheduledEnvelope,
} = require("../envelopes/purchaseDeviceEnvelope");
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
  const initialEnvelopeArgs = {
    signerEmail: body.signerEmail,
    signerName: body.signerName,
    status: "sent",
    docFile: path.resolve(docsPath, initialDocFile),

    // Payments
    gatewayAccountId: process.env.PAYMENT_GATEWAY_ACCOUNT_ID,
    gatewayName: process.env.PAYMENT_GATEWAY_NAME,
    gatewayDisplayName: process.env.PAYMENT_GATEWAY_DISPLAY_NAME,

    // Information regarding what selections the signer has made
    signerPhoneSelection: body.signerPhoneSelection,
    signerInsuranceSelection: body.signerInsuranceSelection,
    signerDownPayment: body.signerDownPayment,
  };

  const monthlyPaymentEnvelopeArgs = {
    signerEmail: body.signerEmail,
    signerName: body.signerName,
    status: "sent",
    docFile: path.resolve(docsPath, monthlyPaymentDocFile),

    // Payments
    gatewayAccountId: process.env.PAYMENT_GATEWAY_ACCOUNT_ID,
    gatewayName: process.env.PAYMENT_GATEWAY_NAME,
    gatewayDisplayName: process.env.PAYMENT_GATEWAY_DISPLAY_NAME,

    // Scheduled Sending
    resumeTime: body.signerResumeTime,
  };

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    initialEnvelopeArgs: initialEnvelopeArgs,
    monthlyPaymentEnvelopeArgs: monthlyPaymentEnvelopeArgs,
  };
  let firstResults = null;
  let secondResults = null;

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
  let monthlyPaymentEnvelope = makeScheduledEnvelope(
    args.monthlyPaymentEnvelopeArgs
  );

  // Step 2: Send the envelopes to the signer
  try {
    firstResults = await sendEnvelope(initialEnvelope, args);
  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.purchaseDeviceFirstEnvelopeError);
  }

  try {
    secondResults = await sendEnvelope(monthlyPaymentEnvelope, args);
  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.purchaseDeviceSecondEnvelopeError);
  }

  if (firstResults) {
    req.session.envelopeId = firstResults.envelopeId;
    res.status(200).send(text.envelope.envelopeSent);
  }
};

module.exports = { createController };
