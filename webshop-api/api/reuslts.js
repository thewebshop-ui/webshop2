import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db("webshop");
  const collection = db.collection("results");

  try {
    const data = req.body;
    const insertResult = await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    res.status(200).json({ success: true, insertedId: insertResult.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
