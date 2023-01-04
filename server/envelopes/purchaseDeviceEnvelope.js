const fs = require('fs');
const eSignSdk = require('docusign-esign');
const text = require('../assets/text.json');

const currencyMultiplier = 100;
let signerPhoneSelection = { name: '', price: 0 };
let monthlyPayment = 0;
let todaysDate = new Date();

/**
 * Creates envelope definition with remote signing.
 */
function makePurchasedEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.docFile
  // args.status
  // args.signerPhoneSelection
  // args.gatewayAccountId
  // args.gatewayName
  // args.gatewayDisplayName
  // args.minutesDelay

  // Map all of the phone options and their prices
  switch (args.signerPhoneSelection) {
    case '0':
      signerPhoneSelection = {
        name: text.purchaseDeviceController.iPhone14,
        price: 799,
      };
      break;
    case '1':
      signerPhoneSelection = {
        name: text.purchaseDeviceController.iPhone14Pro,
        price: 999,
      };
    case '2':
      signerPhoneSelection = {
        name: text.purchaseDeviceController.iPhone14ProMax,
        price: 1099,
      };
      break;
    case '3':
      signerPhoneSelection = {
        name: text.purchaseDeviceController.samsungGalaxy,
        price: 1199,
      };
      break;
    case '4':
      signerPhoneSelection = {
        name: text.purchaseDeviceController.googlePixel,
        price: 899,
      };
      break;
  }

  // For use in the envelope tabs to help determine total costs
  const insuranceSelected = args.signerInsuranceSelection === 'Yes' ? 240 : 0;

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString('base64');
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: 'Purchase Device Document', // Can be different from actual file name
    fileExtension: 'pdf',
    documentId: '1',
  });

  // Create the envelope definition
  let env = new eSignSdk.EnvelopeDefinition();
  env.emailSubject = text.purchaseDeviceController.emailSubject;

  // Add the document to the envelope
  env.documents = [doc];

  // Create a signer recipient to sign the document, identified by name and email
  let signer = eSignSdk.Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: '1',
  });

  ////////////////////////////////////////////////////////////////
  //////////////////// TAB CONSTRUCTIONS /////////////////////////
  ////////////////////////////////////////////////////////////////

  // Create signing and other fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning

  // The 1st signing tab with just initials
  let signTerms = eSignSdk.InitialHere.constructFromObject({
    anchorString: '/sn1/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
  });

  // The 2nd signing tab for full signature
  let signBuyer = eSignSdk.SignHere.constructFromObject({
    anchorString: '/sn2/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
  });

  // An autofilled spot that uses the user's full name
  let fullName = eSignSdk.FullName.constructFromObject({
    anchorString: '/sn3/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
  });

  // Another autofilled spot that uses current date
  let dateToday = eSignSdk.DateSigned.constructFromObject({
    anchorString: '/date/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
  });

  // Display the first day of the next month as the first payment
  let paymentDate = eSignSdk.Text.constructFromObject({
    anchorString: '/datePay/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
    locked: 'true',
    value: new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 1).toDateString(),
  });

  // A text box for the user to enter their address
  let buyerAddress = eSignSdk.Text.constructFromObject({
    anchorString: '/adr/',
    anchorUnits: 'pixels',
    anchorYOffset: '15',
    anchorXOffset: '-35',
    anchorIgnoreIfNotPresent: 'false',
    width: 150,
    height: 80,
    tooltip: 'Enter address here',
  });

  ////// Phone Selection & Prices //////
  // The phone selection
  let itemDescription1 = eSignSdk.Text.constructFromObject({
    anchorString: '/itemdesc1/',
    anchorIgnoreIfNotPresent: 'false',
    value: signerPhoneSelection.name,
    locked: 'true',
  });

  // Including insurance in the item order if it was selected
  let itemDescription2 = eSignSdk.Text.constructFromObject({
    anchorString: '/itemdesc2/',
    anchorIgnoreIfNotPresent: 'false',
    value: insuranceSelected ? 'Insurance' : '',
    locked: 'true',
  });

  // The actual price of the selected phone
  let price1 = eSignSdk.Text.constructFromObject({
    anchorString: '/price1/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + signerPhoneSelection.price,
    locked: 'true',
  });

  // The price for insurance for 2 years
  let price2 = eSignSdk.Text.constructFromObject({
    anchorString: '/price2/',
    anchorIgnoreIfNotPresent: 'false',
    value: insuranceSelected ? '$240/24 months' : '',
    locked: 'true',
  });

  // The total price of phone + insurance
  let price3 = eSignSdk.Text.constructFromObject({
    anchorString: '/price3/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + (insuranceSelected + signerPhoneSelection.price),
    locked: 'true',
  });

  // How much money was initially put down
  let downPayment1 = eSignSdk.Text.constructFromObject({
    anchorString: '/dpay1/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + args.signerDownPayment,
    locked: 'true',
  });

  // A 2nd tab for the down payment to put in the totals box
  let downPayment2 = eSignSdk.Text.constructFromObject({
    anchorString: '/dpay2/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + args.signerDownPayment,
    locked: 'true',
  });

  // How much money is owed for the phone after the first down payment
  let balance1 = eSignSdk.Text.constructFromObject({
    anchorString: '/bal1/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + (signerPhoneSelection.price - args.signerDownPayment),
    locked: 'true',
  });

  // The amount of the insurance
  let balance2 = eSignSdk.Text.constructFromObject({
    anchorString: '/bal2/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + insuranceSelected,
    locked: 'true',
  });

  // How much money is owed overall after the down payment
  let balance3 = eSignSdk.Text.constructFromObject({
    anchorString: '/bal3/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + (signerPhoneSelection.price + insuranceSelected - args.signerDownPayment),
    locked: 'true',
  });

  // The monthly price
  monthlyPayment = ((signerPhoneSelection.price - args.signerDownPayment + insuranceSelected) / 24.0).toFixed(2);

  let amountPayments = eSignSdk.Text.constructFromObject({
    anchorString: '/amntpay/',
    anchorIgnoreIfNotPresent: 'false',
    value: '$' + monthlyPayment,
    locked: 'true',
  });

  ///// The payment tabs themselves /////
  // The amount due today with a dollar sign next to it
  let dueToday = eSignSdk.FormulaTab.constructFromObject({
    font: 'helvetica',
    fontSize: 'size9',
    tabLabel: 'l1e',
    anchorString: '/duetoday/',
    anchorIgnoreIfNotPresent: 'false',
    locked: 'true',
    formula: args.signerDownPayment,
    anchorUnits: 'pixels',
    anchorXOffset: '60',
    roundDecimalPlaces: '0',
    required: 'true',
    disableAutoSize: 'false',
  });

  // The amount listed for Down Payment when the payment page pops up
  let paymentLineItem = eSignSdk.PaymentLineItem.constructFromObject({
    name: 'Down Payment',
    description: `$${args.signerDownPayment}`,
    amountReference: 'l1e',
  });

  // More info about the payments and how they will be processed
  let paymentDetails = eSignSdk.PaymentDetails.constructFromObject({
    gatewayAccountId: args.gatewayAccountId,
    currencyCode: 'USD',
    gatewayName: args.gatewayName,
    gatewayDisplayName: args.gatewayDisplayName,
    lineItems: [paymentLineItem],
  });

  // Hidden formula for the payment itself
  let formulaPayment = eSignSdk.FormulaTab.constructFromObject({
    tabLabel: 'payment',
    formula: `${args.signerDownPayment} * ${currencyMultiplier}`,
    roundDecimalPlaces: '0',
    paymentDetails: paymentDetails,
    hidden: 'true',
    required: 'true',
    locked: 'true',
    documentId: '1',
    pageNumber: '1',
    xPosition: '0',
    yPosition: '0',
  });

  ////////////////////////////////////////////////////////////////
  ////////////////// TAB CONSTRUCTIONS END ///////////////////////
  ////////////////////////////////////////////////////////////////

  // Tabs are set per recipient / signer
  let signerTabs = eSignSdk.Tabs.constructFromObject({
    initialHereTabs: [signTerms],
    signHereTabs: [signBuyer],
    fullNameTabs: [fullName],
    formulaTabs: [dueToday, formulaPayment],
    textTabs: [
      buyerAddress,
      itemDescription1,
      itemDescription2,
      price1,
      price2,
      price3,
      downPayment1,
      downPayment2,
      balance1,
      balance2,
      balance3,
      amountPayments,
      paymentDate,
    ],
    dateSignedTabs: [dateToday],
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

// This is the 2nd envelope to be sent. Ordinarily, this would be sent monthly with scheduled sending
// But for demo purposes, we are mocking the date and actually sending 3 minutes later
function makeScheduledEnvelope(args) {
  // Data for this method
  // args.signerEmail,
  // args.signerName,
  // args.status,
  // args.docFile,
  // args.gatewayAccountId
  // args.gatewayName
  // args.gatewayDisplayName
  // args.resumeTime

  // Read and create document from file in the local directory
  let docPdfBytes = fs.readFileSync(args.docFile);
  let docb64 = Buffer.from(docPdfBytes).toString('base64');
  let doc = new eSignSdk.Document.constructFromObject({
    documentBase64: docb64,
    name: 'Monthly Payment Document', // Can be different from actual file name
    fileExtension: 'pdf',
    documentId: '1',
  });

  // Create the envelope definition
  let env = new eSignSdk.EnvelopeDefinition();
  env.emailSubject = text.purchaseDeviceController.emailSubject;

  // Add the document to the envelope
  env.documents = [doc];

  // Create a signer recipient to sign the document, identified by name and email
  let signer = eSignSdk.Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: '1',
  });

  // Schedule the envelope to send after waiting the amount of time defined by the sender
  // We use 60000 to convert minutes to milliseconds
  let resumeDate = new Date();
  resumeDate.setTime(resumeDate.getTime() + args.signerMinutesDelay * 60000);
  resumeDate = resumeDate.toISOString();

  // Create a workflow model
  // Add the workflow rule that sets the schedule for the envelope to be sent
  const rule = eSignSdk.EnvelopeDelayRule.constructFromObject({
    resumeDate: resumeDate,
  });

  const scheduledSendingModel = eSignSdk.ScheduledSending.constructFromObject({
    rules: [rule],
  });

  const workflow = eSignSdk.Workflow.constructFromObject({
    scheduledSending: scheduledSendingModel,
  });
  env.workflow = workflow;

  ////////////////////////////////////////////////////////////////
  //////////////////// TAB CONSTRUCTIONS /////////////////////////
  ////////////////////////////////////////////////////////////////

  // Display the first day of the month after the next as the 2nd payment
  let paymentDate = eSignSdk.Text.constructFromObject({
    anchorString: '/datepay/',
    anchorUnits: 'pixels',
    anchorXOffset: '10',
    anchorIgnoreIfNotPresent: 'false',
    locked: 'true',
    value: new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 2, 1).toDateString(),
  });

  ///// The payment tabs themselves /////
  // The amount due today with a dollar sign next to it
  let dueToday = eSignSdk.FormulaTab.constructFromObject({
    font: 'helvetica',
    fontSize: 'size9',
    tabLabel: 'l1e',
    anchorString: '/duetoday/',
    anchorIgnoreIfNotPresent: 'false',
    locked: 'true',
    formula: monthlyPayment,
    anchorUnits: 'pixels',
    anchorXOffset: '60',
    required: 'true',
    disableAutoSize: 'false',
  });

  // The amount listed for Down Payment when the payment page pops up
  let paymentLineItem = eSignSdk.PaymentLineItem.constructFromObject({
    name: 'Down Payment',
    description: `$${monthlyPayment}`,
    amountReference: 'l1e',
  });

  // More info about the payments and how they will be processed
  let paymentDetails = eSignSdk.PaymentDetails.constructFromObject({
    gatewayAccountId: args.gatewayAccountId,
    currencyCode: 'USD',
    gatewayName: args.gatewayName,
    gatewayDisplayName: args.gatewayDisplayName,
    lineItems: [paymentLineItem],
  });

  // Hidden formula for the payment itself
  let formulaPayment = eSignSdk.FormulaTab.constructFromObject({
    tabLabel: 'payment',
    formula: `${monthlyPayment} * ${currencyMultiplier}`,
    paymentDetails: paymentDetails,
    hidden: 'true',
    required: 'true',
    locked: 'true',
    documentId: '1',
    pageNumber: '1',
    xPosition: '0',
    yPosition: '0',
  });
  ////////////////////////////////////////////////////////////////
  ////////////////// TAB CONSTRUCTIONS END ///////////////////////
  ////////////////////////////////////////////////////////////////

  // Tabs are set per recipient / signer
  let signerTabs = eSignSdk.Tabs.constructFromObject({
    formulaTabs: [dueToday, formulaPayment],
    textTabs: [paymentDate],
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

module.exports = { makePurchasedEnvelope, makeScheduledEnvelope };
