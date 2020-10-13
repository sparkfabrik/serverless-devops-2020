// This configures X-Ray on (almost) all the code.
// tslint:disable-next-line:variable-name
// const AWSXRay = require('aws-xray-sdk-core');
// const AWS = AWSXRay.captureAWS(require('aws-sdk'));
import * as AWS from 'aws-sdk';

export class SimpleFactory {
  static DynamoClient(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient({});
  }

  static S3Client(): AWS.S3 {
    return new AWS.S3();
  }

  static SQSClient(): AWS.SQS {
    return new AWS.SQS({ apiVersion: '2012-11-05' });
  }

}
