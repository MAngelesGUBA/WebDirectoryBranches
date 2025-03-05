const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://dev-6l57ggbencotfisl.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-6l57ggbencotfisl.us.auth0.com/`,
});

module.exports = checkJwt; 