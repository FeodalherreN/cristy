import { MONGO } from '../constants';
import mongoClient from '../database/mongoClient';

const entryService = {
  async insertEntry(entry) {
    const dbQuery = this.getEntryQuery(entry);
    const existingEntry = await mongoClient.findOne(MONGO.ENTRY_COLLECTION, dbQuery);

    if (existingEntry) {
      const updatedEntry = {
        $set: {
          updateDate: +new Date(),
          body: entry.body,
          headers: entry.headers,
          request: entry.request,
        },
      };
      await mongoClient.updateOne(MONGO.ENTRY_COLLECTION, dbQuery, updatedEntry);
    } else {
      await mongoClient.insertOne(MONGO.ENTRY_COLLECTION, entry);
    }
  },
  async getRequest(connectId, request) {
    const dbQuery = {
      connectId,
      'request.method': request.method,
      'request.uri.host': request.uri.host,
      'request.uri.path': request.uri.path,
    };

    const result = await mongoClient.findOne(MONGO.ENTRY_COLLECTION, dbQuery);
    return result;
  },
  getEntryQuery(entry) {
    const dbQuery = {
      connectId: entry.connectId,
      'request.method': entry.request.method,
      'request.uri.host': entry.request.uri.host,
      'request.uri.path': entry.request.uri.path,
    };

    return dbQuery;
  },
};

export default entryService;
