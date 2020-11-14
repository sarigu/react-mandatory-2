const express = require("express");
const app = express();

const PORT = 4000;





app.get("/", (req, res) => {
    return res.send({ data: "something" });

    console.log("works")
});



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

    
/*     songs.findOne({title: "Wake me up"}, (song) => {
        console.log(song);
    }); */

});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
