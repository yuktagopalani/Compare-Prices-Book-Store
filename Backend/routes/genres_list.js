const express = require('express');
const router = express.Router();

var genres = require('../db/genres');
router.get('/genres', (req, res) =>{
    (async () => {
        genres = await genres.getGenres();
        res.status(200).send(genres);
    })();
    
})
exports.router = router;