const express = require('express');
const router = express.Router();

var genre_info = require('../db/genre_info');
var amazon_bestsellers = require('../constants/amazon_bestsellers');
var book_by_genre = require('../scrapping/book_by_genre');

router.get('/genres/:genre', (req, res) =>{
    var { genre } = req.params;
    genre = genre.replaceAll("+"," ");
    console.log(genre);
    (async () => {
        genre_detail = await genre_info.getGenreInfo(genre);
        genre_url = genre_detail[0]['website link'];
        books = await book_by_genre.getBookByGenre(amazon_bestsellers,genre_url);
        res.status(200).send(books);
    })();
    
})
exports.router = router;