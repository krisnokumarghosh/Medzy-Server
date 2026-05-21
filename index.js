const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();

const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    const db = client.db("medzy");
    const allDoctorCollection = db.collection("all-doctor");

    app.get("/rated-doctors", async (req, res) => {
      const result = await allDoctorCollection
        .find({
          rating: { $gt: 4.7 },
        })
        .toArray();

      res.send(result);
    });

    app.get("/all-doctors", async (req, res) => {
      const result = await allDoctorCollection.find().toArray();

      res.send(result);
    });

    app.get("/all-doctors/:id", async (req, res) => {
      const { id } = req.params;
      const result = await allDoctorCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
