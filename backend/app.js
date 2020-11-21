const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

//var jsonParser = bodyParser.json();

app.use(express.json());

const PORT = 5000;

const db = require("./db");
const collection = "users";

/*app.get('/', (req, res) => {
  db.getDB().collection(collection).find().toArray((error, collection) => {
    console.log(collection);
  });
});*/

app.post('/createAccount', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    }

    db.getDB().collection(collection).insertOne(newUser, (error, result) => {
      console.log(result.ops[0]);
      if (result.insertedCount === 1) {
        console.log("new user");
      } else {
        throw new Error(error);
      }
    });

  } catch{
    res.status(500).send();
  }
})

app.post('/login', async (req, res) => {
  let user = "";
  try {
    user = await db.getDB().collection(collection).findOne({ email: req.body.email });
    console.log(user);
  } catch (err) {
    res.status(500).send()
  }

  if (user == null) {
    //return res.status(400).send("cannot find user")
    console.log("cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      //res.send("sucess")
      console.log("sucess");
    } else {
      //res.send("not allowed")
      console.log("not allowed");
    }
  } catch{
    res.status(500).send()
  }
})

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
