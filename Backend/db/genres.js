async function getGenres(db){
    var genres = [];
    let collection = db.collection('genres');
    let response = await collection.find({}).toArray();
    response.forEach((genre)=>{
        genres.push(genre.category);
    });

    return genres;
}

exports.getGenres = getGenres;
