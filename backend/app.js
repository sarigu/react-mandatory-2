const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const PORT = 5000;

const db = require("./db");
const collection = "users";

app.post('/createAccount', jsonParser, (req, res) => {

  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email, 
    password: req.body.password
  }

  console.log(newUser);
  db.getDB().collection(collection).insertOne(newUser, (error, result) => {
    console.log(result.ops[0]);
    if (result.insertedCount === 1) {
      console.log("new user");
    } else {
      throw new Error(error);
    }
  });

})

app.get('/', (req, res) => {



  db.getDB().collection(collection).find().toArray((error, collection) => {
console.log(collection);
  });

});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
