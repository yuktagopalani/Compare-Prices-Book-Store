const express = require('express');
const router = express.Router();
// var genres = require('../db/genres');
var {genre_data} = require('../constants/genres_data');
function genereRouter(database,app){
    app.use("/api/v1",
        router.get('/genres', (req, res) =>{
            // (async () => {
            //     genres = await genres.getGenres(database);
            //     res.status(200).send(genres);
            // })();
            
            const genres = Object.keys(genre_data);
            res.status(200).send(genres);
            
        })
    );
}


exports.genereRouter = genereRouter;