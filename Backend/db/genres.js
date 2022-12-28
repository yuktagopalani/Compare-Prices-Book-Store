const connection = require('./connection');

async function getGenres(){
    var genres = [];
    const db = await connection.getConnection();
    let collection = db.collection('genres');
    let response = await collection.find({}).toArray();
    response.forEach((genre)=>{
        genres.push(genre.category);
    });

    return genres;
}

exports.getGenres = getGenres;
// (async () => {
//     genres = await getGenres();
//     console.log(genres);
// })();

