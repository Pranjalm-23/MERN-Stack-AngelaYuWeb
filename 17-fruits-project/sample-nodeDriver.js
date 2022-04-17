const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const url =
  "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);
// ,{useNewUrlParser:true} should be added if required

async function run() {
  try {
    await client.connect();

    const database = client.db('fruitsDb');





    const collectionName = database.collection("fruits");
       // create a document to insert
       const doc = {
         title: "banana",
         content: "My favourite",
       }
       const result = await collectionName.insertOne(doc);
       console.log(`A document was inserted with the _id: ${result.insertedId}`);






  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
