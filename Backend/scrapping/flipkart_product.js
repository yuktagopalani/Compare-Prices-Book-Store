const cheerio = require("cheerio");
const axios = require("axios");

const flipkart_product = require("../constants/flipkart_product");
var bookSchema = require('../models/book');

async function getFlipkartPrice(book_name){
    books_data = [];
    book_name = book_name.replace(" ","+");
    const url = flipkart_product.flp_str1 + book_name + flipkart_product.flp_str2;

    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        const books=$(flipkart_product.books); 
        
        books.each(function(){

        title = $(this).find(flipkart_product.title).text();
        price = $(this).find(flipkart_product.price).text();
        description = $(this).find(flipkart_product.description).text();
        link =  flipkart_product.base_url + $(this).find(flipkart_product.link).attr("href");
        image = $(this).find(flipkart_product.image).attr("src");
        var book = new bookSchema.Book(title, price, description, link, image);
        books_data.push(book);  

        });
        return books_data;
    }
    catch(error){
        console.error(error);
    }
}
exports.getFlipkartPrice=getFlipkartPrice;

