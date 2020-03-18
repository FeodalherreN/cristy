import { MongoClient } from 'mongodb';
import { MONGO } from '../constants';

let client = null;
let db = null;

const mongoClient = {
  async initiateConnection() {
    client = await new MongoClient(MONGO.CONNECTION_URL, { useUnifiedTopology: true }).connect();
    db = client.db(MONGO.DATABASE);
  },
  async findOne(collectionName, query) {
    try {
      await this.initiateConnection();
      const collection = db.collection(collectionName);

      return await collection.findOne(query);
    } catch (error) {
      console.error(error);

      return null;
    } finally {
      await client.close();
    }
  },
  async findMany(collectionName, query) {
    try {
      await this.initiateConnection();
      const collection = db.collection(collectionName);

      return await collection.find(query).toArray();
    } catch (error) {
      console.error(error);

      return null;
    } finally {
      await client.close();
    }
  },
  async updateOne(collectionName, query, entry) {
    try {
      await this.initiateConnection();
      const collection = db.collection(collectionName);

      await collection.updateOne(query, entry);
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  },
  async insertOne(collectionName, entry) {
    try {
      await this.initiateConnection();
      const collection = db.collection(collectionName);

      await collection.insertOne(entry);
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  },
};

export default mongoClient;
