import { SimpleFactory } from '../lib/SimpleFactory';
import { ProfileRepository } from '../lib/ProfileRepository';
import { S3Service } from '../lib/S3Service';
import { FromEnvironment } from '../lib/Configuration';
import { Profile } from '../lib/models/Profile';

const repository = new ProfileRepository(
  SimpleFactory.DynamoClient(),
  FromEnvironment('DYNAMODB_PROFILES_TABLE')
);

const s3Service = new S3Service(SimpleFactory.S3Client());

exports.handler = async function (event: AWSLambda.S3CreateEvent, context: AWSLambda.Context, callback: AWSLambda.Callback) {
  try {
    const record = event.Records[0];
    const data = await s3Service.GetCsvContent(
      record.s3.bucket.name, record.s3.object.key, ['firstName', 'lastName', 'bio', 'role', 'status']);
    for (let i = 0; i < data.length; i++) {
      const profile = new Profile(data[i]);
      if (!profile.firstName || !profile.lastName) {
        continue;
      };
      await repository.Create(data[i] as Profile);
    }
    return
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
