const express = require("express");
const mongodb = require("mongodb");
const app = express();
const cors = require("cors")
const donenv = require("dotenv").config();
const MongoClient = mongodb.MongoClient;
const URL = 'mongodb+srv://admin8220:japan8220@cluster0.v2n1svi.mongodb.net/?retryWrites=true&w=majority'
const DB = "assign_mentor";
//Midleware
app.use(express.json());
app.use(cors({
  origin: "https://gleeful-longma-910014.netlify.app/"
}))

//<---------------------------------------------------- Students --------------------------------------------------->


app.get("/", function (req, res) {
  res.json("HI THERE")
})
app.post("/students", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    await db.collection("students").insertOne(req.body);
    //close coolection
    await connection.close();
    res.status(200).json({ message: "data inserted" });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.get("/students", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    const studentsdata = await db.collection("students").find().toArray();
    //close coolection
    await connection.close();
    res.json(studentsdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.get("/students/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("students")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.put("/students/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("students")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.delete("/students/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("students")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});


//<---------------------------------------------------- mentors--------------------------------------------------->

app.post("/mentors", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    await db.collection("mentors").insertOne(req.body);
    //close coolection
    await connection.close();
    res.status(200).json({ message: "data inserted" });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.get("/mentors", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    const studentsdata = await db.collection("mentors").find().toArray();
    //close coolection
    await connection.close();
    res.json(studentsdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.get("/mentors/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("mentors")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.put("/mentors/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("mentors")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

app.delete("/mentors/:id", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    let user = await db
      .collection("mentors")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
// -----------------------------------------------------querys-----------------------------------------------------


app.get("/students/search/:Key", async function (req, res) {
  try {
    // Create a Conection Between Node and MongoDb
    const connection = await MongoClient.connect(URL);
    //select the DB
    const db = connection.db(DB);
    //Select Collection and Do the opprations
    const studentsdata = await db.collection("students").find(
      {
        "$or": [
          { mentor_name: { $regex: req.params.Key } },
          { status: { $regex: req.params.Key } }
        ]
      }
    ).toArray();
    //close collection
    await connection.close();
    res.json(studentsdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
app.listen(process.env.PORT || 3007);
