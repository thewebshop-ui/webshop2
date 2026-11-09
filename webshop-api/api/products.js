import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://thewebshop-ui.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

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
