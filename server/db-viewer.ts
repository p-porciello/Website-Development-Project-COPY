import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URI as string;
const dbName = 'ucvts-lost-and-found';

async function main() {
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected!\n');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    console.log(`Database: ${dbName}`);
    console.log('='.repeat(50));

    if (collections.length === 0) {
      console.log('No collections found.');
    }

    for (const col of collections) {
      const collection = db.collection(col.name);
      const count = await collection.countDocuments();
      const docs = await collection.find({}).toArray();

      console.log(`\nCollection: ${col.name} (${count} documents)`);
      console.log('-'.repeat(50));

      for (const doc of docs) {
        console.log(JSON.stringify(doc, null, 2));
      }
    }
  } catch (error) {
    console.error('Failed to connect:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

main();
