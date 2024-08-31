const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// bookingHotel
// aRAEWW0YiJfOlCtW

// mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://bookingHotel:aRAEWW0YiJfOlCtW@cluster1.ofi7kql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const roomsCollection = client.db("bookingHotel").collection("rooms");

    // get all rooms
    app.get("/rooms", async(req, res) => {
      const result = await roomsCollection.find().toArray();
      res.send(result);
    })

    // get single room data
    app.get("/rooms/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await roomsCollection.findOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Booking Hotel')
})

app.listen(port, () => {
  console.log(`server running on ${port}`)
})