import { MongoClient } from 'mongodb';

const { DATABASE_URI } = process.env;
const client = new MongoClient(DATABASE_URI);
await client.connect();

export default client.db('natours');
