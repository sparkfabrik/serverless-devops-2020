import { SimpleFactory } from '../lib/SimpleFactory';
import { ProfileRepository } from '../lib/ProfileRepository';
import { FromEnvironment } from '../lib/Configuration';
import { getCORSHeaders } from '../lib/Utilities';
import { Profile } from '../lib/models/Profile';

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
    if (!event.body) {
      throw new Error('Invalid request');
    }
    const profile = new Profile(JSON.parse(event.body));
    if (!profile.firstName || !profile.lastName) {
      throw new Error('Invalid request');
    }
    const newProfile = await repository.Create(profile);
    const response: AWSLambda.APIGatewayProxyResult = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(newProfile)
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(new Error(err.message));
  }
}
