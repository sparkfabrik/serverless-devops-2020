import { Profile } from './models/Profile';

export class ProfileRepository {
  constructor(
    private client: AWS.DynamoDB.DocumentClient,
    private table: string
  ) { }

  async Get(queryId: string): Promise<Profile | null> {
    const params = {
      TableName: this.table,
      Key: {
        id: queryId,
      }
    };
    const data = await this.client.get(params).promise();
    if (!data.Item) {
      return null;
    }
    try {
      return new Profile(data.Item);
    } catch (error) {
      throw error;
    }
  }

  async List(onlyPublic: boolean): Promise<Profile[]> {
    let data;
    if (onlyPublic) {
      const params: AWS.DynamoDB.DocumentClient.QueryInput = {
        TableName: this.table,
        IndexName: 'StatusIndex',
        KeyConditionExpression: '#status = :value',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':value': 'public' },
        Select: 'ALL_ATTRIBUTES',
      };
      data = await this.client.query(params).promise();
    } else {
      const params: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName: this.table,
      };
      data = await this.client.scan(params).promise();
    }
    return data.Items ? data.Items.map(item => new Profile(item)) : [];
  }

}
