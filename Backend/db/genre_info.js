async function getGenreInfo(genre, db){
    let collection = db.collection('genres');
    let cursor = collection.find({'category': genre});
    const response = await cursor.toArray(); 
    return response;
}
exports.getGenreInfo = getGenreInfo;