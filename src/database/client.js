import { MongoClient } from "mongodb";
import httpContext from "express-http-context";
import { HTTP_CONTEXT_KEYS } from "../constants";
import logger from "../logger";

const getConnection = async () => {
  const options = { useUnifiedTopology: true };
  const clientInstance = await new MongoClient(
    process.env.MONGO_CONNECTION_URL,
    options
  ).connect();
  const dbInstance = clientInstance.db(process.env.MONGO_DATABASE);
  const connection = {
    client: clientInstance,
    db: dbInstance,
  };

  return connection;
};

const mongoClient = {
  async findOne(query) {
    const connection = await getConnection();
    try {
      const collection = connection.db.collection("entries");

      const existingEntry = await collection.findOne(query);
      if (existingEntry == null) return existingEntry;

      return existingEntry;
    } catch (error) {
      logger.error(error);

      return null;
    } finally {
      await connection.client.close();
    }
  },
  async findMany(query) {
    const connection = await getConnection();
    try {
      const collection = connection.db.collection("entries");

      const entries = await collection
        .find(query)
        .sort({ timestamp: -1 })
        .limit(500)
        .toArray();
      if (!entries || entries.length === 0) {
        return entries;
      }

      return entries;
    } catch (error) {
      logger.error(error);

      return null;
    } finally {
      await connection.client.close();
    }
  },
  async updateOne(query, entry) {
    const connection = await getConnection();
    try {
      const collection = connection.db.collection("entries");

      entry.id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
      entry.client = httpContext.get(HTTP_CONTEXT_KEYS.HOST);
      entry.timestamp = Date.now();
      const replacementEntry = {
        _id: query._id,
        entry: entry,
      };

      await collection.replaceOne(query, replacementEntry);
    } catch (error) {
      logger.error(error);
    } finally {
      await connection.client.close();
    }
  },
  async insertOne(query, entry) {
    const connection = await getConnection();
    try {
      const collection = connection.db.collection("entries");

      entry.id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
      entry.client = httpContext.get(HTTP_CONTEXT_KEYS.HOST);
      entry.timestamp = Date.now();
      const newEntry = {
        _id: query._id,
        entry: entry,
      };
      await collection.insertOne(newEntry);
    } catch (error) {
      logger.error(error);
    } finally {
      await connection.client.close();
    }
  },
};

export default mongoClient;
