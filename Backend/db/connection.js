const {MongoClient} = require("mongodb");
var db_data = require('../config/db');
const url = db_data.url;
const database = db_data.database;
const client = new MongoClient(url);

async function getConnection(){
    let result = await client.connect();
    let db = result.db(database);
    return db;
}

exports.getConnection = getConnection;
