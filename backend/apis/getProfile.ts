import { SimpleFactory } from '../lib/SimpleFactory';
import { ProfileRepository } from '../lib/ProfileRepository';
import { FromEnvironment } from '../lib/Configuration';
import { getCORSHeaders } from '../lib/Utlities';

const repository = new ProfileRepository(
  SimpleFactory.DynamoClient(),
  FromEnvironment('DYNAMODB_PROFILES_TABLE')
);

exports.handler = async function (event: AWSLambda.APIGatewayProxyEvent, context: AWSLambda.Context, callback: AWSLambda.Callback) {
  try {
    if (!event.pathParameters || !event.pathParameters.id) {
      throw new Error('Invalid request');
    }
    const profileId = event.pathParameters.id;
    const profile = await repository.Get(profileId);
    const response: AWSLambda.APIGatewayProxyResult = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(profile),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(new Error(err.message));
  }
}
