const cheerio = require("cheerio");
const axios = require("axios");

var bookSchema = require('../models/book');

async function getBestSellers(amazon_bestsellers){
    books_data = [];
    const url = amazon_bestsellers.url;
    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        const books=$(amazon_bestsellers.books);
        
        books.each(function(){
            title_detail = $(this).find(amazon_bestsellers.title_detail);
            title_tag = $(title_detail).find(amazon_bestsellers.title_tag);
            title = $(title_tag).find(amazon_bestsellers.small_title).text() || $(title_tag).find(amazon_bestsellers.big_title).text(); 
            author = $(this).find(amazon_bestsellers.author_type1).text() || $(this).find(amazon_bestsellers.author_type2).text();
            price = $(this).find(amazon_bestsellers.price).text();
            description = $(this).find(amazon_bestsellers.description).text();
            link = amazon_bestsellers.base_url + $(this).find(amazon_bestsellers.link).attr("href");
            image = $(this).find(amazon_bestsellers.image).attr("src");
            if(title && author && price && description && link && image){
                var book = new bookSchema.Book(title,price,description,link,image,author);
                books_data.push(book);
            }
              
        });

        return books_data;
    }
    catch(error){
        console.error(error);
    }
}

exports.getBestSellers = getBestSellers;