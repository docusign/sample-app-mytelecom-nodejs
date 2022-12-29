# Node.js and React: MyTelecom Sample Application
Welcome to the DocuSign sample app MyTelecom. MyTelecom showcases how the telecommunications industry could integrate with DocuSign technologies using Node.js and React. All scenarios are for **demonstration purposes only**, meaning none of what you sign is binding in any way and envelopes in their entirety are deleted after 30 days. The following are the 3 different scenarios you can test out yourself:
1. **Assumption of Liability.**  
   This will describe the process of changing ownership of the account. User is asked who they would like to change ownership of the account to. User is asked if they agree to transfer the ownership by signing the document using Embedded Signing. The envelope is sent through SMS to the receiver taking ownership of the account.  
   * Embedded Signing
   * SMS Delivery
   * ID Verification

2. **Purchase New Device.**  
   The user can purchase a new device from the telecom provider through remote signing. The user should be taken to a form where they input their name, email, choose device and payment options. After submitting the form they should receive two envelopes with device and payment information.
   * Remote Signing
   * Scheduled Sending
   * Payments
   
3. **Multi-Line Service Change Request for Business Accounts.**  
   This will describe the process of creating the service change request for multiple recipients. The user should be taken to a form where they choose the type of service change, set the number of customers receiving the changes, and information regarding each recipient.
   * Remote Signing
   * Bulk Sending

## Installation
### Prerequisites
* A DocuSign Developer account (email and password) on [demo.docusign.net](https://demo.docusign.net). If you don't already have a developer account, create a [free account](https://go.docusign.com/sandbox/productshot/?elqCampaignId=16535).
* A DocuSign integration key (a client ID) that is configured to use **JSON Web Token (JWT) Grant**. You will need the **integration key** itself and its **RSA key pair**. To use this application, you must add your application's **Redirect URI** to your integration key. To run locally, add http://localhost:3000/index and http://localhost:3000 as your **Reidirect URI**. This [**video**](https://www.youtube.com/watch?v=GgDqa7-L0yo) demonstrates how to create an integration key (client ID) for a user application like this example.
* Payment gateway for your developer account.
* Enabled SMS delivery for your account. You can enable SMS delivery by following the instructions on this [**page**](https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/sms-delivery/).
* [Node.js](https://nodejs.org/) v10+

### Creating a new integration
Before you can run this app on your local machine, you first must create a new integration with a DocuSign developer account.
1. First, get a local copy of this repo by either downloading it or cloning it onto your computer.
2. If you don't already have one, create a [free developer account](https://go.docusign.com/sandbox/productshot/?elqCampaignId=16535).
3. Log into your developer account, and navigate to [My Apps & Keys](https://admindemo.docusign.com/apps-and-keys).
4. Copy over **User ID** and **API Account ID** to your `env_example` file
   * Rename the file to `.env`
5. On the Apps and Keys page, select **Add App and Integration Key**.
6. Name the integration and then copy over the **Integration Key** to your `.env` file
7. On the integration page, navigate to **Service Integration** and select **Generate RSA**
   * Copy the Private Key into your local repo in the `example_private.key` file.
     * Rename the file to `private.key`
8. Add the following as redirect URIs for your app:
   * http://localhost:3000
   * http://localhost:3000/index

### Configure a Payment Gateway
If you are planning on running the Purchase A New Device scenario, you will need to configure a payment gateway for your developer account. For our example, we will use the Stripe gateway service.

1. Select the Stripe button on the [**Payments**](https://admindemo.docusign.com/authenticate?goTo=payments) page in your developer account.
2. For development, you can skip the Stripe account application by using the **Skip this account form** link at the top of the page. An enabled Stripe payment gateway is now associated with your DocuSign developer account and is shown under **Payment Gateway**.
3. Save the **Gateway Account ID** GUID to your .env file and update the other relevant settings under **Payment configuration**.

### Environment variables
* **USER_ID** - A GUID unique to each user's DocuSign Account, located on the Apps and Keys page.
* **API_ACCOUNT_ID** - A GUID unique to each user's DocuSign Account, located on the Apps and Keys page.
* **INTEGRATION_KEY** - The integration key is the same as the client ID
* **DS_OAUTH_SERVER** - The DocuSign authentication server, used for JWT (for testing purposes, use `https://account-d.docusign.com`).
* **SESSION_SECRET** - A unique string of your choice that is used to encrypt the session cookie.
* **TARGET_ACCOUNT_ID** - Target account ID. Use FALSE to indicate the user's default
* **PAYMENT_GATEWAY_ACCOUNT_ID** - Payment gateway account ID.
* **PAYMENT_GATEWAY_NAME** - Payment gateway name.
* **PAYMENT_GATEWAY_DISPLAY_NAME** - Payment gateway display name.
* **REDIRECT_URI_HOME** - Where the user will be redirected after providing consent for JWT.
* **REDIRECT_URI** - Where the user will be redirected after executing the scenarios.
* **PORT_NUMBER** - The port number for back end application.

### Installing the dependencies
After you have configured your DocuSign settings and integration, you can begin installing the dependencies on your local machine.
1. If you do not already have Node.js installed on your computer, install it from the [Node.js website](https://nodejs.org/en/download/). If you are not sure whether you already have Node.js installed, open up a command-line window and enter: `npm version`  
If you get the current version or a message about a patch, you have Node.js installed. If not, you will need to install it.
2. Open up a command-line window and navigate to the client window with `cd client` and run `npm install`
3. Then, navigate into the server directory with `cd ../server` and run `npm install`

## Running MyTelecom locally
### Manual
1. Navigate to project folder: **`cd sample-app-mytelecom-nodejs`**
2. Navigate to the client folder with **`cd client`** and run **`npm run start`**
3. Navigate to the server directory with **`cd ../server`** and run **`npm run start`**
4. Open a browser to http://localhost:3000 

### Using scripts
1. Navigate to the application folder: **`cd sample-app-mytelecom-nodejs`**
2. Navigate to the server folder: **`cd server`**
3. Run **``npm run dev``**
4. Open a browser to http://localhost:3000 