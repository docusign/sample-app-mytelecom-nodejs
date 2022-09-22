# Node.js and React: MyTelecom Sample Application
Welcome to the DocuSign sample app MyTelecom. MyTelecom showcases how the telecommunications industry could integrate with DocuSign technologies using Node.js and React. All scenarios are for **demonstration purposes only**, meaning none of what you sign is binding in any way and envelopes in their entirety are deleted after 30 days. The following are the 3 different scenarios you can test out yourself:
1. Assumption of Liability
   * **(UPDATE DESCRIPTION)**
2. **Purchase New Device:** The user can purchase a new device from the telecom provider through remote signing. 
   * **(UPDATE DESCRIPTION)**
3. Multi-Line Service Change Request for Business Accounts
   * **(UPDATE DESCRIPTION)**

## Running MyTelecom locally
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

### Installation
After you have configured your DocuSign settings and integration, you can begin installing the dependencies on your local machine.
1. If you do not already have Node.js installed on your computer, install it from the [Node.js website](https://nodejs.org/en/download/). If you are not sure whether you already have Node.js installed, open up a command-line window and enter:  
`npm version`  
If you get the current version or a message about a patch, you have Node.js installed. If not, you will need to install it.
2. Open up a command-line window and navigate to the client window with `cd client` and run `npm install`
3. Then, navigate into the server directory with `cd ../server` and run `npm install`
4. After the dependencies have finished downloading, run `npm run dev`
5. Open a browser to http://localhost:3000