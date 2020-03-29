import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import dynamoClient from './clients/dynamoClient';
import mongoClient from './clients/mongoClient';

const client = {
  getClient() {
    const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
    if (config.settings.database === 'mongodb') {
      return mongoClient;
    }
    if (config.settings.database === 'dynamodb') {
      return dynamoClient;
    }

    throw new Error('NO_DATABASE_SET_IN_CONFIG');
  },
  async findOne(query) {
    const clientInstance = this.getClient();
    return clientInstance.findOne(query);
  },
  async findMany(query) {
    const clientInstance = this.getClient();
    return clientInstance.findMany(query);
  },
  async insertOne(query, entry) {
    const clientInstance = this.getClient();
    return clientInstance.insertOne(query, entry);
  },
  async updateOne(query, entry) {
    const clientInstance = this.getClient();
    return clientInstance.updateOne(query, entry);
  },
};

export default client;
