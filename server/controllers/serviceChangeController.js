const path = require("path");
const docsPath = path.resolve(__dirname, "../documents");
const docFile = "World_Wide_Corp_lorem.pdf";
const text = require("../assets/text.json");
const { sendEnvelope } = require("../envelopes/sendEnvelope");
const { serviceChange } = require("../envelopes/serviceChangeEnvelope.js");
const { checkToken } = require("./jwtController");

/**
 * Controller that creates and sends an envelope to the signer.
 */
const createController = async (req, res, next) => {
  // Check the access token, which will also update the token
  // if it is expired
  await checkToken(req);

  // Construct arguments
  const { body } = req;
  const envelopeArgs = {
    signerEmail: body.signerEmail,
    signerName: body.signerName,
    signers: body.signers,
    status: "created",
    docFile: path.resolve(docsPath, docFile),
  };

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs,
  };
  let results = null;

  // Step 2: Send the envelopes to the signer
  try {
    results = await serviceChange(args);
  } catch (error) {
    console.log(error);
    next(new Error(text.envelope.serviceChangeEnvelopeController));
  }

  if (results) {
    req.session.envelopeId = results.envelopeId;
    res.status(200).send(text.envelope.envelopeSent);
  }
};

module.exports = { createController };
