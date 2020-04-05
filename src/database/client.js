import { MongoClient } from 'mongodb';
import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import { encrypt, decrypt } from '../crypt';
import logger from '../logger';

const getConnection = async () => {
  const options = { useUnifiedTopology: true };
  const clientInstance = await new MongoClient(
    process.env.MONGO_CONNECTION_URL,
    options,
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
      const collection = connection.db.collection('entries');

      const encryptedEntry = await collection.findOne(query);

      if (encryptedEntry == null) return encryptedEntry;

      return decrypt(encryptedEntry.entry);
    } catch (error) {
      logger.error(error);

      return null;
    } finally {
      await connection.client.close();
    }
  },
  async findMany(id) {
    const connection = await getConnection();
    try {
      const collection = connection.db.collection('entries');

      const encryptedEntries = await collection.find({ id }).sort({ timestamp: -1 }).limit(500).toArray();
      if (!encryptedEntries || encryptedEntries.length === 0) {
        return encryptedEntries;
      }
      const decryptedEntries = encryptedEntries.map((row) => ({
        _id: row._id,
        id: row.id,
        entry: decrypt(row.entry),
      }));
      return decryptedEntries;
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
      const collection = connection.db.collection('entries');

      const replacementEntry = {
        _id: query._id,
        id: httpContext.get(HTTP_CONTEXT_KEYS.ID),
        client: httpContext.get(HTTP_CONTEXT_KEYS.HOST),
        timestamp: Date.now(),
        entry: encrypt(entry),
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
      const collection = connection.db.collection('entries');

      const newEntry = {
        _id: query._id,
        id: httpContext.get(HTTP_CONTEXT_KEYS.ID),
        client: httpContext.get(HTTP_CONTEXT_KEYS.HOST),
        timestamp: Date.now(),
        entry: encrypt(entry),
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
