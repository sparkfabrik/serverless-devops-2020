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
    const profiles = await repository.ListPublic();
    const response: AWSLambda.APIGatewayProxyResult = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify({
        data: profiles
      }),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(new Error(err.message));
  }
}
