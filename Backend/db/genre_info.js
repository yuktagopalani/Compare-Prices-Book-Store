
const connection = require('./connection');

async function getGenreInfo(genre){
    const db = await connection.getConnection();
    let collection = db.collection('genres');
    let cursor = collection.find({'category': genre});
    const response = await cursor.toArray(); 
    return response;
}
exports.getGenreInfo = getGenreInfo;