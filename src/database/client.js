import { MongoClient, ObjectId } from 'mongodb';
import { HTTP_CONTEXT_KEYS } from '../constants';
import { encrypt, decrypt } from '../crypt';
import httpContext from 'express-http-context';
import logger from '../logger';

const getConnection = async () => {
  const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
  const options = { useUnifiedTopology: true };
  const clientInstance = await new MongoClient(
    config.mongo.connection_url,
    options,
  ).connect();
  const dbInstance = clientInstance.db(config.mongo.database);
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

      const dbQuery = {
        _id: new ObjectId(query._id),
      };

      const encryptedEntry = await collection.findOne(dbQuery);
      if(!encryptedEntry) return encryptedEntry;

      return decrypt(encryptedEntry);
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
      const collection = connection.db.collection('entries');

      const encryptedEntries = await collection.find(query).toArray();
      if(!encryptedEntries || encryptedEntries.length === 0) {
        return encryptedEntries;
      } else {
        const decryptedEntries = encryptedEntries.forEach(entry => {
            return decrypt(entry);
        });

        return decryptedEntries;
      }
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
      const updatedEntry = encrypt({
        $set: {
          updateDate: +new Date(),
          body: entry.body,
          headers: entry.headers,
          request: entry.request,
          statusCode: entry.statusCode,
        },
      });

      const dbQuery = {
        _id: new ObjectId(query._id),
      };
      
      await collection.updateOne(dbQuery, encrypt(updatedEntry));
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

      const newEntry = encrypt(entry);
      newEntry._id = new ObjectId(query._id);
      await collection.insertOne(newEntry);
    } catch (error) {
      logger.error(error);
    } finally {
      await connection.client.close();
    }
  },
};

export default mongoClient;
