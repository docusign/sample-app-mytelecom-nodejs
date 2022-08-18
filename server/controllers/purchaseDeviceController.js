// To implement:
// Embedded Signing
// Scheduled Sending
// Payments
const path = require("path");
const eSignSdk = require("docusign-esign");
const fs = require("fs");
const { checkToken } = require("./jwtController");

const docsPath = path.resolve(__dirname, "../documents");
const docFile = "World_Wide_Corp_lorem.pdf";

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

  // Send the envelope to signer
  try {
    results = await sendEnvelope(args);
  } catch (error) {
    // TODO: better error handling
    console.log("Error sending the envelope."); // ######## Error here
    console.log(error);
    throw new Error("Error sending envelope in PurchaseDeviceController.");
  }

  if (results) {
    req.session.envelopeId = results.envelopeId;
    res.status(200).send("Envelope Successfully Sent!");
  }
};

const sendEnvelope = async (args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi),
    results = null;

  // Step 1. Make the envelope request body
  let envelope = makeEnvelope(args.envelopeArgs);

  // Step 2. call Envelopes::create API method
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return { envelopeId: envelopeId };
};

/**
 * Creates envelope definition with embedded signing.
 */
function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.signerClientId
  // docFile

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString("base64");
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: "Purchase Device Sample", // can be different from actual file name
    fileExtension: "pdf",
    documentId: "1",
  });

  // Create the envelope definition
  let env = new eSignSdk.EnvelopeDefinition();
  env.emailSubject = "Purchase New Device: Subject";

  // Add the document to the envelope
  env.documents = [doc];

  // Create a signer recipient to sign the document, identified by name and email
  // We set the clientUserId to enable embedded signing for the recipient
  let signer = eSignSdk.Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: "1",
  });

  // Create signHere fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning
  let signHere = eSignSdk.SignHere.constructFromObject({
    anchorString: "/sn1/",
    anchorYOffset: "10",
    anchorUnits: "pixels",
    anchorXOffset: "20",
  });
  // Tabs are set per recipient / signer
  let signerTabs = eSignSdk.Tabs.constructFromObject({
    signHereTabs: [signHere],
  });
  signer.tabs = signerTabs;

  // Add the recipient to the envelope object
  let recipients = eSignSdk.Recipients.constructFromObject({
    signers: [signer],
  });
  env.recipients = recipients;

  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = args.status;

  return env;
}

module.exports = { createController };
