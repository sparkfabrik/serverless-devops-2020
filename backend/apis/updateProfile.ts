import { SimpleFactory } from '../lib/SimpleFactory';
import { ProfileRepository } from '../lib/ProfileRepository';
import { FromEnvironment } from '../lib/Configuration';
import { getCORSHeaders } from '../lib/Utlities';

const repository = new ProfileRepository(
  SimpleFactory.DynamoClient(),
  FromEnvironment('DYNAMODB_PROFILES_TABLE')
);

exports.handler = async function (event: AWSLambda.APIGatewayProxyEvent, context: AWSLambda.Context, callback: AWSLambda.Callback) {
  if (event.httpMethod === 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: ''
    });
  }
  try {
    if (!event.pathParameters || !event.pathParameters.id) {
      throw new Error('Invalid request');
    }
    if (!event.body) {
      throw new Error('Invalid request');
    }
    const profileId = event.pathParameters.id;
    const profile = JSON.parse(event.body);
    const updatedProfile = await repository.Update(profileId, profile);
    const response: AWSLambda.APIGatewayProxyResult = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(updatedProfile)
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(new Error(err.message));
  }
}
