import { MONGO } from '../constants';
import mongoClient from '../database/mongoClient';

const settingsService = {
  async getSettings() {
    const existingSettings = await mongoClient.findOne(MONGO.SETTINGS_COLLECTION, {});

    if (existingSettings) {
      return existingSettings;
    }
    const settings = {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      headerKey: 'connectid',
      offline: false,
    };

    await mongoClient.insertOne(MONGO.SETTINGS_COLLECTION, settings);

    return mongoClient.findOne(MONGO.SETTINGS_COLLECTION, {});
  },
};

export default settingsService;
