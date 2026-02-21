import 'dotenv/config';
import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database: Db;

async function connectToDb(): Promise<void> {
  try {
    await client.connect();
    database = client.db('ucvts-lost-and-found');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export default {
  connectToDb,
  getDb: (): Db => {
    if (!database) {
      throw new Error('Database not initialized. Call connectToDb() first.');
    }
    return database;
  },
};
