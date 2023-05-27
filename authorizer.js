const { CognitoJwtVerifier } = require("aws-jwt-verify");
const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;
const jwtVerifier = CognitoJwtVerifier.create({
  // userPoolId: "us-east-1_R91tacPBi",
  // tokenUse: "id",
  // clientId: "5ahgqk44u7vicb30p5rlbp4rv7",

  userPoolId: COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_WEB_CLIENT_ID,
});

const generatePolicy = (principalId, effect, resource) => {
  var authReponse = {};
  authReponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authReponse.policyDocument = policyDocument;
  }
  authReponse.context = { foo: "bar" };
  console.log(JSON.stringify(authReponse));
  return authReponse;
};

exports.handler = async (event, context, callback) => {
  // lambda authorizer code
  var token = event.authorizationToken; // "allow" or "deny"
  console.log(token);
  // Validate the token
  try {
    const palyload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(palyload));
    callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch (error) {
    callback("Error: Invalid token");
  }

  //console.log(JSON.stringify(token));
  // switch (token) {
  //   case "allow":
  //     callback(null, generatePolicy("user", "Allow", event.methodArn));
  //     break;
  //   case "deny":
  //     callback(null, generatePolicy("user", "Deny", event.methodArn));
  //     break;
  //   default:
  //     callback("Error: Invalid token");
  // }
};
