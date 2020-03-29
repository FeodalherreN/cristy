import AWS from 'aws-sdk';
import crypto from 'crypto';
import httpContext from 'express-http-context';
import logger from '../../logger';
import { HTTP_CONTEXT_KEYS } from '../../constants';

const getConnection = () => {
  const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
  AWS.config.update(config.aws);
  const docClient = new AWS.DynamoDB.DocumentClient();

  return docClient;
};

const removeEmptyStringElements = (obj) => {
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
};

const dynamoClient = {
  async findOne(key) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
    };

    try {
      const result = await getConnection().docClient.get(params).promise();

      return result.Item;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },
  async updateOne(key, value) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
      UpdateExpression: 'set entry = :v',
      ExpressionAttributeValues: {
        ':v': removeEmptyStringElements(value),
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      await getConnection().docClient.update(params).promise();
    } catch (error) {
      logger.error(error);
    }
  },
  async insertOne(key, response) {
    const params = {
      TableName: 'entries',
      Key: {
        id: crypto.createHash('md5').update(key).digest('hex'),
      },
      Item: {
        entry: removeEmptyStringElements(response),
      },
    };

    try {
      await getConnection().docClient.put(params).promise();
    } catch (error) {
      logger.error(error);
    }
  },
  async findMany(query) {
    const params = query;
    params.TableName = 'entries';

    try {
      const result = await getConnection().docClient.query(params).promise();
      return result.Items;
    } catch (error) {
      logger.error(error);
      return [];
    }
  },
};

export default dynamoClient;
