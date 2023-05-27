// Test pre auth Lambda function
exports.testHandler = async (event, context, callback) => {
  // Extract attributes from the event object
  // const { username } = event.request.userAttributes;
  console.log("---------Pre Authentication-------------");
  console.log(JSON.stringify(event));
  // console.log(username);

  // // Check an external data base the subscription the authenticated user has
  // const subscriptionStatus = await checkExternalDatabase(username);

  // // Stop Cognito flow based on subscription status
  // if (subscriptionStatus !== 'ACTIVE') {
  //   throw new Error('User does not have a valid subscription');
  // }

  // Continue Cognito flow
  // return event;
  callback(null, event);
};
