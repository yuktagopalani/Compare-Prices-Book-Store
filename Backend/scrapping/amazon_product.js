const cheerio = require("cheerio");
const axios = require("axios");

const amazon_product = require('../constants/amazon_product');
var bookSchema = require('../models/book');

async function getAmazonPrice(book_name){
    books_data = [];
    book_name = book_name.replace(" ","+");
    const url=amazon_product.amz_str1 + book_name + amazon_product.amz_str2;

    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        const books=$(amazon_product.books);
        
        books.each(function(){
            
            title = $(this).find(amazon_product.title).text();
            price = $(this).find(amazon_product.price_symbol).text() + $(this).find(amazon_product.price_whole).text();
            description = $(this).find(amazon_product.description).text().trim();
            link = "https://www.amazon.in"+ $(this).find(amazon_product.link).attr("href");
            image = $(this).find(amazon_product.image).attr("src");
            
            if(title && price && (description=="Hardcover" || description=="Paperback") && link){
                var book = new bookSchema.Book(title, price, description, link, image);
                books_data.push(book);
            }
        });

        return books_data;
    }
    catch(error){
        console.error(error);
    }
}

exports.getAmazonPrice = getAmazonPrice;