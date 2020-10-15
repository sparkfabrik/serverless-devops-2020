import * as parse from 'csv-parse';

export class S3Service {

  constructor(
    private s3Client: AWS.S3
  ) { }

  GetSignedUrl(bucket: string, key: string, expireTime: number) {
    return new Promise<string>((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: key,
        Expires: expireTime,
      };
      this.s3Client.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(url);
      });
    });
  }

  async GetCsvContent(bucket: string, key: string, columns: string[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const options: parse.Options = {
        delimiter: ',',
        columns: columns,
        from: 2,
      };
      const parser = parse(options, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
      const params: AWS.S3.GetObjectRequest = { Bucket: bucket, Key: key };
      this.s3Client
        .getObject(params)
        .createReadStream()
        .pipe(parser);
    });
  }

}
