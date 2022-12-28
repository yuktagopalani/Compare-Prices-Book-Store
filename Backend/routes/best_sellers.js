const express = require('express');
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();

var book = require('../models/book');
async function getBestSellers(){
    books_data = [];
    const url = "https://www.amazon.in/gp/bestsellers/books/";
    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        var book_obj = new book.Book(".a-cardui._cDEzb_grid-cell_1uMOS.expandableGrid.p13n-grid-content", "._cDEzb_p13n-sc-css-line-clamp-1_1Fn1y", "span._cDEzb_p13n-sc-price_3mJ9Z","span.a-size-small.a-color-secondary.a-text-normal","a.a-link-normal.a-text-normal","img.a-dynamic-image.p13n-sc-dynamic-image.p13n-product-image");
        const books=$(book_obj.books);
        
        books.each(function(){
            title = $(this).find(book_obj.title).text();
            price = $(this).find(book_obj.price).text();
            description = $(this).find(book_obj.description).text();
            link = $(this).find(book_obj.link).attr("href");
            image = $(this).find(book_obj.image).attr("src");
            books_data.push({title, price, description,link,image});  
        });

        return books_data;
    }
    catch(error){
        console.error(error);
    }
}
router.get('/best_sellers', (req, res) =>{
    (async () => {
        best_sellers = await getBestSellers();
        res.status(200).send(best_sellers);
    })();
    
})
exports.router = router;
