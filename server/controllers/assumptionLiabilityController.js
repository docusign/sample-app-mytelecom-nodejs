const path = require("path");
const eSignSdk = require("docusign-esign");
const docsPath = path.resolve(__dirname, "../documents");
const initialDocFile = "Purchase_New_Device.pdf";
const text = require("../assets/text.json");
const { sendEnvelope, makeRecipientViewRequest } = require("../envelopes/sendEnvelope");
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
    status: "sent",
    docFile: path.resolve(docsPath, initialDocFile),

    // New phone owner info
    recipientName: body.recipientName,
    recipientCountryCode: body.countryCode,
    recipientPhone: body.recipientPhoneNumber
  };

  const args = {
    accessToken: req.session.accessToken,
    basePath: req.session.basePath,
    accountId: req.session.accountId,
    envelopeArgs: envelopeArgs
  };
  

  // Step 1: Create Envelope
  let assumptionLiabilityEnvelope = makeEnvelope(args.envelopeArgs)

  // Step 2: Send the envelopes to the signer
  try {
    let results = null;
    results = await sendEnvelope(assumptionLiabilityEnvelope, args);
    let envelopeId = results.envelopeId;
    console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
  
    // Step 3. create the recipient view, the embedded signing
    let viewRequest = makeRecipientViewRequest(args.envelopeArgs);
    // Call the CreateRecipientView API
    // Exceptions will be caught by the calling function

    let eSignApi = new eSignSdk.ApiClient();
    eSignApi.setBasePath(args.basePath);
    eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
    let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);

    results = await envelopesApi.createRecipientView(args.accountId, envelopeId, {
      recipientViewRequest: viewRequest,
    });

    if (results) {
        req.session.envelopeId = results.envelopeId;
        res.status(200).send(results.redirectUrl);
    }
  
    return { envelopeId: envelopeId, redirectUrl: results.url };

  } catch (error) {
    console.log(error);
    throw new Error(text.envelope.assumptionLiabilityEnvelopeError);
  }

};

module.exports = { createController };
