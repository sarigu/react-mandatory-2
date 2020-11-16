const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const PORT = 5000;

const MongoClient = require('mongodb').MongoClient;

const connectionUrl = "mongodb://localhost:27017";

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    console.log(error);
  }
  const userDB = client.db("userDb");
  const users = userDB.collection("users");

  users.find().toArray((error, users) => {
    console.log(users);
    client.close();
  });
});

app.post('/createAccount', jsonParser, (req, res) => {

  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }

  console.log(newUser);

  MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
      console.log(error);
    }
    const userDB = client.db("userDb");
    const users = userDB.collection("users");

    users.insertOne(newUser, (error, result) => {
      console.log(result.ops[0]);
      if (result.insertedCount === 1) {
        client.close();
      } else {
        throw new Error(error);
      }
    });
  });


})

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
