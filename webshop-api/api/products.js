import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db("webshop");
  const collection = db.collection("products");

  try {
    const products = await collection.find({}).toArray();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
