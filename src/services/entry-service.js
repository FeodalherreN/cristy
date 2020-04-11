import httpContext from "express-http-context";
import { HTTP_CONTEXT_KEYS } from "../constants";
import client from "../database/client";
import queryBuilder from "../builders/query-builder";

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
  async getEntryById(id) {
    const mongoQuery = queryBuilder.createFromId(id);
    const result = await client.findOne(mongoQuery);
    return result;
  },
  async getEntries(query) {
    const response = await client.findMany(query);
    return response;
  },
};

export default entryService;
