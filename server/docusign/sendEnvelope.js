// Send the envelope
const eSignSDK = require("docusign-esign");

module.exports.sendEnvelope = async (envelopeDefiniton, args) => {
  let eSignApi = new eSignSDK.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer" + args.accessToken);
  let envelopesApi = new eSignSDK.EnvelopesApi(eSignApi);
  let results = null;

  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefiniton: envelopeDefiniton,
  });

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. Envelope ${envelopeId}`);

  return envelopeId;
};
