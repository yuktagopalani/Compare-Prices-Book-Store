const express = require('express');
const router = express.Router();
var genres = require('../db/genres');

function genereRouter(database,app){
    app.use("/api/v1",
        router.get('/genres', (req, res) =>{
            (async () => {
                genres = await genres.getGenres(database);
                res.status(200).send(genres);
            })();
            
        })
    );
}


exports.genereRouter = genereRouter;