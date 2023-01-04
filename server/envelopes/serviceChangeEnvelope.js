const fs = require('fs');
const eSignSdk = require('docusign-esign');
const text = require('../assets/text.json');

async function serviceChange(args) {
  let dsApiClient = new eSignSdk.ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);

  let bulkEnvelopesApi = new eSignSdk.BulkEnvelopesApi(dsApiClient);
  let envelopeApi = new eSignSdk.EnvelopesApi(dsApiClient);

  const signers = args.envelopeArgs.signers;

  const recipients = signers.map((signer, index) => ({
    name: signer.name,
    email: signer.email,
    roleName: `signer`,
    tabs: [
      {
        tabLabel: 'limit',
        initialValue: signer.limit,
      },
      {
        tabLabel: 'name',
        initialValue: signer.name,
      },
    ],
  }));

  let bulkCopies = recipients.map((recipient) => ({ recipients: [recipient] }));

  const bulkSendingList = {
    name: 'bulkSendingList.csv',
    bulkCopies: bulkCopies,
  };

  const envelope = await envelopeApi.createEnvelope(args.accountId, {
    envelopeDefinition: makeEnvelope(args.envelopeArgs),
  });

  const bulkList = await bulkEnvelopesApi.createBulkSendList(args.accountId, { bulkSendingList });

  let bulkResult = await bulkEnvelopesApi.createBulkSendRequest(args.accountId, bulkList.listId, {
    bulkSendRequest: {
      envelopeOrTemplateId: envelope.envelopeId,
    },
  });

  let results = await bulkEnvelopesApi.getBulkSendBatchStatus(args.accountId, bulkResult.batchId);

  return results;
}

function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.docFile
  // args.status

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString('base64');
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: 'Multi-Line Service Change Request for Business Accounts', // Can be different from actual file name
    fileExtension: 'pdf',
    documentId: '1',
  });

  let signer = eSignSdk.Signer.constructFromObject({
    name: 'signer_name',
    email: 'signer@mail.com',
    deliveryMethod: 'email',
    status: 'created',
    roleName: 'signer',
    recipientId: '1',
  });

  const signHere = eSignSdk.SignHere.constructFromObject({
    anchorString: '/signature/',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
    tabLabel: 'Sign Here',
  });

  const limitLabel = eSignSdk.Text.constructFromObject({
    locked: 'true', // mark the field as readonly
    documentId: 1,
    pageNumber: 1,
    name: 'limit',
    tabLabel: 'limit',
    anchorString: '/limit/',
  });

  const limitChangeLabel = eSignSdk.Text.constructFromObject({
    locked: 'true', // mark the field as readonly
    documentId: 1,
    pageNumber: 1,
    name: 'limitChange',
    tabLabel: 'limitChange',
    anchorString: '/limitChange/',
    value: args.limitChange,
  });

  const nameLabel = eSignSdk.Text.constructFromObject({
    locked: 'true', // mark the field as readonly
    documentId: 1,
    pageNumber: 1,
    name: 'name',
    tabLabel: 'name',
    anchorString: '/name/',
  });

  const tabs = eSignSdk.Tabs.constructFromObject({
    signHereTabs: [signHere],
    textTabs: [limitLabel, limitChangeLabel, nameLabel],
  });

  signer.tabs = tabs;

  const recipients = {
    signers: [signer],
  };

  let env = new eSignSdk.EnvelopeDefinition();

  env.emailSubject = text.serviceChangeController.emailSubject;
  env.envelopeIdStamping = 'true';

  // Add the document to the envelope
  env.documents = [doc];

  env.recipients = recipients;

  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = 'created';

  return env;
}

module.exports = { makeEnvelope, serviceChange };
