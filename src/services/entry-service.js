import dynamoClient from '../database/dynamoClient';

const entryService = {
  async insertEntry(entry) {
    const key = JSON.stringify({
      id: entry.connectId,
      'request.method': entry.request.method,
      'request.uri.host': entry.request.uri.host,
      'request.uri.path': entry.request.uri.path,
    });
    const existingEntry = await dynamoClient.getItem(key);

    if (existingEntry) {
      await dynamoClient.updateItem(key, entry);
    } else {
      await dynamoClient.insertItem(key, entry);
    }
  },
  async getRequest(id, request) {
    const key = JSON.stringify({
      id,
      'request.method': request.method,
      'request.uri.host': request.uri.host,
      'request.uri.path': request.uri.path,
    });

    const result = await dynamoClient.getItem(key);
    return result;
  },
};

export default entryService;
