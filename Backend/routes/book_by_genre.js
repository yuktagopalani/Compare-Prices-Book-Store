const express = require('express');
const router = express.Router();

// var genre_info = require('../db/genre_info');
var amazon_bestsellers = require('../constants/amazon_bestsellers');
var book_by_genre = require('../scrapping/book_by_genre');

var {genre_data} = require('../constants/genres_data');

// function bookByGenreRouter(database, app) {
//     app.use("/api/v1",
        router.get('/genres/:genre', (req, res) => {
            var { genre } = req.params;
            genre = String(genre).split("+").join(" ");
            // (async () => {
            //     genre_detail = await genre_info.getGenreInfo(genre, database);
            //     genre_url = genre_detail[0]['website link'];
            //     books = await book_by_genre.getBookByGenre(amazon_bestsellers,genre_url);
            //     res.status(200).send(books);
            // })();
            
            (async () => {
                try{
                    genre_details = genre_data[genre];
                    genre_url = genre_details['website link'];
                    books = await book_by_genre.getBookByGenre(amazon_bestsellers,genre_url);
                    return books;
                }
                catch(e){
                    res.status(404).send(e);
                }
            })();

            
        })
//     );
// }

async function getBookUtil(req,res){
    var { genre } = req.params;
    genre = String(genre).split("+").join(" ");
    // console.log(genre);
    try{
        // console.log(genre_data);
        genre_details = genre_data[genre];
        genre_url = genre_details['website link'];
        books = await book_by_genre.getBookByGenre(amazon_bestsellers,genre_url);
        return books;
    }
    catch(e){
        console.error(e);
    }
}
exports.getBookUtil = getBookUtil;
exports.router = router;