import { SimpleFactory } from '../lib/SimpleFactory';
import { ProfileRepository } from '../lib/ProfileRepository';
import { S3Service } from '../lib/S3Service';
import { FromEnvironment } from '../lib/Configuration';
import { getCORSHeaders } from '../lib/Utilities';

const repository = new ProfileRepository(
  SimpleFactory.DynamoClient(),
  FromEnvironment('DYNAMODB_PROFILES_TABLE')
);

const s3Service = new S3Service(SimpleFactory.S3Client());

exports.handler = async function (event: AWSLambda.APIGatewayProxyEvent, context: AWSLambda.Context, callback: AWSLambda.Callback) {
  if (event.httpMethod === 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: ''
    });
  }
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.key) {
      throw new Error('Invalid request');
    }
    const url = await s3Service.GetSignedUrl(FromEnvironment('ASSETS_BUCKET'), event.queryStringParameters.key, 180);
    const response: AWSLambda.APIGatewayProxyResult = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(url),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(new Error(err.message));
  }
}
