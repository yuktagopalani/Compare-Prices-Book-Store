const {MongoClient} = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const database = 'Kitaab';
const client = new MongoClient(url);

async function getConnection(){
    let result = await client.connect();
    let db = result.db(database);
    return db;
}

exports.getConnection = getConnection;
