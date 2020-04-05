import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import client from '../database/client';
import queryBuilder from '../builders/query-builder';

const entryService = {
  async insertOrUpdateEntry(response) {
    const query = queryBuilder.createFromResponse(response);

    const existingEntry = await client.findOne(query);

    if (existingEntry) {
      await client.updateOne(query, response);
    } else {
      response.id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
      await client.insertOne(query, response);
    }
  },
  async updateEntry(response) {
    const query = queryBuilder.createFromResponse(response);

    const existingEntry = await client.findOne(query);
    if (existingEntry) {
      await client.updateOne(query, response);
      return true;
    }

    return false;
  },
  async getEntry(request) {
    const query = queryBuilder.createFromRequest(request);
    const result = await client.findOne(query);
    return result;
  },
  async getEntryOffline(request) {
    const query = queryBuilder.createFromRequest(request);
    const result = await client.findOne(query);
    return result;
  },
  async getEntryByObject(query) {
    const mongoQuery = queryBuilder.createFromObject(query);
    const result = await client.findOne(mongoQuery);
    return result;
  },
  async getEntries(id) {
    const response = await client.findMany(id);
    return response;
  },
};

export default entryService;
