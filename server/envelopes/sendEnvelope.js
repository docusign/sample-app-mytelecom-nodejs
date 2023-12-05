const eSignSdk = require('docusign-esign');
const text = require('../assets/text.json');
const dsReturnUrl = process.env.REDIRECT_URI + '/submitted';
const sendEnvelope = async (envelope, args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId

  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);

  // Call Envelopes::create API method
  // Exceptions will be caught by the calling function
  let results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });

  let envelopeId = results.envelopeId;
  console.log(text.envelope.envelopeCreated + envelopeId);

  return { envelopeId: envelopeId };
};

function makeRecipientViewRequest(args) {
  // Data for this method
  // args.dsReturnUrl
  // args.signerEmail
  // args.signerName
  // args.signerClientId
  // args.dsPingUrl
  // args.frameAncestors
  // args.messageOrigins

  // Create the recipient view request object
  return new eSignSdk.RecipientViewRequest.constructFromObject({
    authenticationMethod: 'none',
    clientUserId: '1',
    recipientId: '1',
    returnUrl: dsReturnUrl, // TODO: After finish signing, how to get back to this URL?
    userName: args.signerName,
    email: args.signerEmail,
    frameAncestors: args.frameAncestors,
    messageOrigins: args.messageOrigins,
  });
}

module.exports = { sendEnvelope, makeRecipientViewRequest };
