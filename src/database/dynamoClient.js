import AWS from 'aws-sdk';
import crypto from 'crypto';
import configService from '../services/config-service';

const config = configService.getSettings();
AWS.config.update(config.aws);
const docClient = new AWS.DynamoDB.DocumentClient();

const dynamoClient = {
  async getItem(key) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
    };

    try {
      const result = await docClient.get(params).promise();

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async updateItem(key, value) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
      UpdateExpression: 'set entry = :v',
      ExpressionAttributeValues: {
        ':v': this.removeEmptyStringElements(value),
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      await docClient.update(params).promise();
    } catch (error) {
      console.error(error);
    }
  },
  async insertItem(key, value) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
      Item: {
        entry: this.removeEmptyStringElements(value),
      },
    };

    try {
      await docClient.put(params).promise();
    } catch (error) {
      console.error(error);
    }
  },
  removeEmptyStringElements(obj) {
    if (obj == null) return obj;

    const tempObj = obj;
    Object.keys(tempObj).forEach((prop) => {
      if (typeof tempObj[prop] === 'object') {
        this.removeEmptyStringElements(tempObj[prop]);
      } else if (tempObj[prop] === '') {
        delete tempObj[prop];
      }
    });
    return tempObj;
  },
};

export default dynamoClient;
