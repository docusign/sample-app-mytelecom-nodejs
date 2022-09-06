const eSignSdk = require("docusign-esign");
const text = require("../assets/text.json");
const sendEnvelope = async (envelope, args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId

  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi),
    results = null;

  // Call Envelopes::create API method
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });

  let envelopeId = results.envelopeId;
  console.log(text.envelope.envelopeCreated + envelopeId);

  return { envelopeId: envelopeId };
};

module.exports = { sendEnvelope };
