const path = require("path");
const docsPath = path.resolve(__dirname, "../documents");
const docFile = "World_Wide_Corp_lorem.pdf";
const text = require("../assets/text.json");
const { sendEnvelope } = require("../envelopes/sendEnvelope");
const { makeEnvelope } = require("../envelopes/serviceChangeEnvelope.js");
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
  };

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs,
  };
  let results = null;

  // Step 1: Create Envelopes
  // The first envelope in this instance is the initial device purchase envelope
  // The second envelope is to demonstrate scheduled sending, in this case, for monthly payments
  let envelope = makeEnvelope(args.envelopeArgs);

  // Step 2: Send the envelopes to the signer
  try {
    results = await sendEnvelope(envelope, args);
  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.serviceChangeEnvelopeController);
  }

  if (results) {
    req.session.envelopeId = results.envelopeId;
    res.status(200).send(text.envelope.envelopeSent);
  }
};

module.exports = { createController };
