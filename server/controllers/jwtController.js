// JWT flow:
// 1. Create consent URI and obtain user consent.
// 2. Construct JWT using the IK and User ID, scope, RSA public and private key.
// 3. Send POST containing the JWT to DS_AUTH_SERVER to get access token.
// 4. Using the access token, send a POST to get the user's base URI (account_id + base_uri).
// 5. Now you can use the access token and base URI to make API calls.
// When the access token expires, create a new JWT and request a new access token.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const eSignSDK = require('docusign-esign');
const fs = require('fs'); // Used to parse RSA key
const dayjs = require('dayjs'); // Used to set and determine a token's expiration date
const oAuth = eSignSDK.ApiClient.OAuth;
const restApi = eSignSDK.ApiClient.RestApi;
const text = require('../assets/text.json');
// Constants
const rsaKey = fs.readFileSync(path.resolve(__dirname, '../../private.key'));
const jwtLifeSec = 60 * 60; // Request lifetime of JWT token is 60 minutes
const scopes = ['signature', 'impersonation'];

// For production environment, change "DEMO" to "PRODUCTION"
const basePath = restApi.BasePath.DEMO; // https://demo.docusign.net/restapi
const oAuthBasePath = oAuth.BasePath.DEMO; // account-d.docusign.com

/**
 * Creates and sends a JWT token using the integration key, user ID, scopes and RSA key.
 * Then stores the returned access token and expiration date.
 */
const getToken = async (req) => {
  // Get API client and set the base paths

  const eSignApi = new eSignSDK.ApiClient();
  eSignApi.setOAuthBasePath(oAuthBasePath);

  // Request a JWT token
  let results;

  try {
    results = await eSignApi.requestJWTUserToken(
      process.env.INTEGRATION_KEY,
      process.env.USER_ID,
      scopes,
      rsaKey,
      jwtLifeSec
    );
  } catch (error) {
    if (error.response.body.error === 'consent_required') {
      throw new Error(text.jwt.consentError);
    } else {
      throw error;
    }
  }

  // Save the access token and the expiration
  const expiresAt = dayjs().add(results.body.expires_in, 's');
  req.session.accessToken = results.body.access_token;
  req.session.tokenExpirationTimestamp = expiresAt;
};

/**
 * Checks to see that the current access token is still valid, and if not,
 * updates the token.
 * Must be called before every DocuSign API call.
 */
const checkToken = async (req) => {
  const noToken = !req.session.accessToken || !req.session.tokenExpirationTimestamp,
    currentTime = dayjs(),
    bufferTime = 1; // One minute buffer time

  // Check to see if we have a token or if the token is expired
  let needToken =
    noToken || dayjs(req.session.tokenExpirationTimestamp).subtract(bufferTime, 'm').isBefore(currentTime);

  // Update the token if needed
  if (needToken) {
    await getToken(req);
  }
};

/**
 * Gets the account ID, account name, and base path of the user using the access token.
 */
const getUserInfo = async (req) => {
  // Get API client
  const eSignApi = new eSignSDK.ApiClient(),
    targetAccountId = process.env.targetAccountId,
    baseUriSuffix = '/restapi';
  eSignApi.setOAuthBasePath(oAuthBasePath);

  // Get user info using access token
  const results = await eSignApi.getUserInfo(req.session.accessToken);

  let accountInfo;
  if (!Boolean(targetAccountId)) {
    // Find the default account
    accountInfo = results.accounts.find((account) => account.isDefault === 'true');
  } else {
    // Find the matching account
    accountInfo = results.accounts.find((account) => account.accountId == targetAccountId);
  }
  if (typeof accountInfo === 'undefined') {
    throw new Error(`Target account ${targetAccountId} not found!`);
  }

  req.session.accountId = accountInfo.accountId;
  req.session.basePath = accountInfo.baseUri + baseUriSuffix;
};

/**
 * First checks if there is already a valid access token, updates it if it's expired,
 * then gets some user info. If the user has never provided consent, then they are
 * redirected to a login screen.
 */
login = async (req, res) => {
  try {
    await checkToken(req);
    await getUserInfo(req);

    res.status(200).send(text.jwt.successfulLogin);
  } catch (error) {
    // User has not provided consent yet, send the redirect URL to user.
    if (error.message === text.jwt.consentError) {
      let consent_scopes = scopes.join('%20');
      consent_url =
        `${process.env.DS_OAUTH_SERVER}/oauth/auth?response_type=code&` +
        `scope=${consent_scopes}&client_id=${process.env.INTEGRATION_KEY}&` +
        `redirect_uri=${process.env.REDIRECT_URI}`;

      res.status(210).send(consent_url);
    } else {
      console.log(text.jwt.jwtError + error);
      res.status(error.status).send(error.message);
    }
  }
};
/**
 * Logs the user out by destroying the session.
 */
const logout = (req, res) => {
  req.session = null;
  res.status(200).send(text.jwt.successfulLogout);
};

module.exports = {
  checkToken,
  login,
  logout,
};
