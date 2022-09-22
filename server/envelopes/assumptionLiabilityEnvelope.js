const fs = require("fs");
const eSignSdk = require("docusign-esign");
const text = require("../assets/text.json");

/**
 * Creates envelope definition with remote signing.
 */
function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.docFile
  // args.status

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString("base64");
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: "Assumption of liability doc", // Can be different from actual file name
    fileExtension: "pdf",
    documentId: "1",
  });

  // Create the envelope definition
  let env = new eSignSdk.EnvelopeDefinition();
  env.emailSubject = text.assumptionLiabilityController.emailSubject;

  // Add the document to the envelope
  env.documents = [doc];

  // Create a signer recipient to sign the document, identified by name and email
  let signer = eSignSdk.Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: "1",
    clientUserId: "1"
  });

  let signerPhoneNumber = eSignSdk.RecipientPhoneNumber.constructFromObject({
    countryCode: args.recipientCountryCode,
    number: args.recipientPhone,
  });

  let newPhoneRecipient = eSignSdk.Signer.constructFromObject({
    phoneNumber: signerPhoneNumber,
    name: args.recipientName,
    recipientId: "2"
  });

  ////////////////////////////////////////////////////////////////
  //////////////////// TAB CONSTRUCTIONS /////////////////////////
  ////////////////////////////////////////////////////////////////

  // Create signing and other fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning

  let signOg = eSignSdk.SignHere.constructFromObject({
    anchorString: "/ogsign/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "19",
    scaleValue: "0.65",
    anchorIgnoreIfNotPresent: "true",
  });

  let newSign = eSignSdk.SignHere.constructFromObject({
    anchorString: "/newsigner/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "19",
    scaleValue: "0.65",
    anchorIgnoreIfNotPresent: "true",
  });

  // An autofilled spot that uses the user's full name
  let ogName = eSignSdk.Text.constructFromObject({
    anchorString: "/ogname/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "40",
    value: args.signerName
  });

  // An autofilled spot that uses the user's full name
  let newSignerName = eSignSdk.Text.constructFromObject({
    anchorString: "/newname/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "40",
    value: args.recipientName
  });

  let newPhoneNumber = eSignSdk.Text.constructFromObject({
    anchorString: "/newphonenumber/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "40",
    value: args.recipientPhone
  });

  let newEmail = eSignSdk.Text.constructFromObject({
    anchorString: "/newemail/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "100"
  });

  let newAddress = eSignSdk.Text.constructFromObject({
    anchorString: "/newaddress/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "100"
  });

  let newCity = eSignSdk.Text.constructFromObject({
    anchorString: "/newcity/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "100"
  });

  let newState = eSignSdk.Text.constructFromObject({
    anchorString: "/newstate/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "100"
  });

  let newZip = eSignSdk.Text.constructFromObject({
    anchorString: "/newzip/",
    anchorUnits: "pixels",
    anchorXOffset: "10",
    anchorYOffset: "-5",
    anchorIgnoreIfNotPresent: "true",
    width: "100"
  });

  ////////////////////////////////////////////////////////////////
  ////////////////// TAB CONSTRUCTIONS END ///////////////////////
  ////////////////////////////////////////////////////////////////

  // Tabs are set per recipient / signer
  let signerTabs = eSignSdk.Tabs.constructFromObject({
    signHereTabs: [signOg],
    textTabs: [ogName, newPhoneNumber, newSignerName]
  });
  signer.tabs = signerTabs;

  let newPhoneRecipientTabs = eSignSdk.Tabs.constructFromObject({
    signHereTabs: [newSign],
    textTabs: [newAddress, newCity, newState, newZip, newEmail]
  });
  newPhoneRecipient.tabs = newPhoneRecipientTabs;

  // Add the recipient to the envelope object
  let recipients = eSignSdk.Recipients.constructFromObject({
    signers: [signer, newPhoneRecipient],
  });
  env.recipients = recipients;

  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = args.status;

  return env;
}

module.exports = { makeEnvelope };
