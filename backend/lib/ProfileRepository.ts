import { Profile } from './models/Profile';
import * as uuid from 'uuid';

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

  async ListPublic(): Promise<Profile[]> {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.table,
      IndexName: 'StatusIndex',
      KeyConditionExpression: '#status = :value',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':value': 'public' },
      Select: 'ALL_ATTRIBUTES',
    };
    const data = await this.client.query(params).promise();
    return data.Items ? data.Items.map(item => new Profile(item)) : [];
  }

  async Create(item: Profile): Promise<Profile> {
    item.id = uuid.v4();
    item.status = 'preview';
    item.createdOn = Date.now();
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.table,
      Item: item,
    };
    await this.client.put(params).promise();
    return item;
  }

}
