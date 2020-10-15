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

  async Update(itemId: string, delta: { [key: string]: object | string }): Promise<Profile> {
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.table,
      Key: { id: itemId },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET ',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };
    Object.getOwnPropertyNames(delta).forEach(property => {
      params.UpdateExpression += `#${property}=:${property}, `;
      if (params.ExpressionAttributeNames) {
        params.ExpressionAttributeNames[`#${property}`] = property;
      }
      if (params.ExpressionAttributeValues) {
        params.ExpressionAttributeValues[`:${property}`] = delta[property];
      }
    });

    if (params.UpdateExpression) {
      params.UpdateExpression = params.UpdateExpression.replace(/\s*,\s*$/, '');
    }
    const data = await this.client.update(params).promise();
    const profile = new Profile(data.Attributes);
    return profile;
  }

  async Delete(id: string): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.table,
      Key: { id: id }
    };
    await this.client.delete(params).promise();
    return;
  }

}
