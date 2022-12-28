const express = require('express');
const router = express.Router();

var books_by_genre = require('../db/books');
router.get('/genres/:genre', (req, res) =>{
    var { genre } = req.params;
    genre = genre.replace("+"," ");
    // genre = genre.replace("%20","&");
    genre = genre.replace("+"," ");
    (async () => {
        books = await books_by_genre.getBooks(genre);
        res.status(200).send(books);
    })();
    
})
exports.router = router;