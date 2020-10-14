export class S3Service {

  constructor(
    private s3Client: AWS.S3
  ) { }

  GetSignedUrl(bucket: string, key: string, expireTime: number) {
    return new Promise<string>((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: key,
        Expires: expireTime
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

}
