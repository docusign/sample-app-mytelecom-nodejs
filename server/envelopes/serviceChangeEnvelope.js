const fs = require("fs");
const eSignSdk = require("docusign-esign");
const text = require("../assets/text.json");

/**
 * Creates envelope definition with remote signing.
 */
function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail1
  // args.signerName1
  // args.docFile
  // args.status

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString("base64");
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: "Multi-Line Service Change Request for Business Accounts", // Can be different from actual file name
    fileExtension: "pdf",
    documentId: "1",
  });

  // Create the envelope definition
  let env = new eSignSdk.EnvelopeDefinition();
  env.emailSubject = text.serviceChangeController.emailSubject;

  // Add the document to the envelope
  env.documents = [doc];

  // Create a signer recipient to sign the document, identified by name and email
  let signer = eSignSdk.Signer.constructFromObject({
    email: args.signerEmail1,
    name: args.signerName1,
    recipientId: "1",
  });

  ////////////////////////////////////////////////////////////////
  //////////////////// TAB CONSTRUCTIONS /////////////////////////
  ////////////////////////////////////////////////////////////////

  // Create signing and other fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning

  // The 1st signing tab with just initials
  let signTerms = eSignSdk.InitialHere.constructFromObject({
    anchorString: "/sn1/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorIgnoreIfNotPresent: "false",
  });

  ////////////////////////////////////////////////////////////////
  ////////////////// TAB CONSTRUCTIONS END ///////////////////////
  ////////////////////////////////////////////////////////////////

  // Tabs are set per recipient / signer
  let signerTabs = eSignSdk.Tabs.constructFromObject({
    initialHereTabs: [signTerms],
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

module.exports = { makeEnvelope };
