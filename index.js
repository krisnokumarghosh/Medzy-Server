const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
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

const JWKS = createRemoteJWKSet(new URL(`${process.env.CLIENT_URL}/api/auth/jwks`));

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

const run = async () => {
  try {
    await client.connect();
    const db = client.db("medzy");
    const allDoctorCollection = db.collection("all-doctor");
    const bookingCollection = db.collection("bookings");

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

    app.get("/all-doctors/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await allDoctorCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    app.post("/bookings", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.send(result);
    });

    app.get("/bookings/:userId", verifyToken, async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId: userId }).toArray();
      res.send(result);
    });

    app.patch("/bookings/:bookingId", verifyToken, async (req, res) => {
      const { bookingId } = req.params;
      const updatedData = req.body;

      const result = await bookingCollection.updateOne(
        { _id: new ObjectId(bookingId) },
        { $set: updatedData },
      );

      res.send(result);
    });

    app.delete("/bookings/:bookingId", verifyToken, async (req, res) => {
      const { bookingId } = req.params;
      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(bookingId),
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
