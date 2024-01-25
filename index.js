const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wn3b7jc.mongodb.net/?retryWrites=true&w=majority`;

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

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
  
    const serviceData = client.db('contestCreation').collection('sixcard');
    const serviceCollection = client.db('contestCreation').collection('allContest');


    app.get('/sixcard', async(req, res) =>{
      const cursor = serviceData.find();
      const result = await cursor.toArray();
      res.send(result);
   })


    
  
    // get data for details route
    app.get("/sixcard/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const result = await serviceData.findOne(query);
      console.log("result", result);
      res.send(result);
    });


    
  
    // get data for details route
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      console.log("result", result);
      res.send(result);
    });

    app.get('/registration', async(req, res) =>{
      const result = await serviceCollection.find().toArray();
      res.send(result);
   })
  

    app.post('/details', async(req, res) =>{
      const newDetails = req.body;
      console.log(newDetails);
      const result = await serviceCollection.insertOne(newDetails);
      res.send(result);
    })
    app.post('/allContest', async(req, res) =>{
      const allContest = req.body;
      console.log(allContest);
      const result = await serviceCollection.insertOne(allContest);
      res.send(result);
    })

   // Connect the client to the server	(optional starting in v4.7)
  //  await client.connect();
   // Send a ping to confirm a successful connection
   await client.db("admin").command({ ping: 1 });
   console.log("Pinged your deployment. You successfully connected to MongoDB!");
 } finally {
   // Ensures that the client will close when you finish/error
  //  await client.close();
 }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Welcome to Contest Creation Platform, it is running')
})

app.listen(port, () => {
    console.log(`Contest Creation Platform Server Running on Port ${port}`)
})


