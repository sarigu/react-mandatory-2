const MongoClient = require('mongodb').MongoClient;

const connectionUrl = "mongodb://localhost:27017";

const state = {
    db: null
}

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log(error);
    }

    state.db = client.db("userDb");
});

const getDB = () => {
    return state.db;
}

module.exports = { getDB };