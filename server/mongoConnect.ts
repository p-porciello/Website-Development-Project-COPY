import 'dotenv/config';
import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

if (process.env.DATABASE_URI) {
    console.log("Connected to MongoDB successfully");
}

let database: Db;

export default {
    getDb: (): Db => {
        database = client.db("ucvts-lost-and-found");
        return database;
    },
};
