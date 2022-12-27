const express = require('express');
const app = express();
const port = 8080;
const cheerio = require("cheerio");
const axios = require("axios");


app.use(express.json())

app.listen(
    port,
    () => console.log(`its alive on http://localhost:${port}`)
)

async function getFlipkartPrice(book_name){
    books_data = [];
    const flp_str1="https://www.flipkart.com/search?q=";
    const flp_str2="&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&p%5B%5D=facets.language%255B%255D%3DEnglish";
    book_name = book_name.replace(" ","+");
    const url=flp_str1 + book_name + flp_str2;

    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        const books=$("._4ddWXP");
        
        books.each(function(){

        title = $(this).find(".s1Q9rs").text();
        price = $(this).find("._30jeq3").text();
        description = $(this).find("._3Djpdu").text();
        link = $(this).find(".s1Q9rs").attr("href");
        books_data.push({title, price, description,link});  

        });

        return books_data;
    }
    catch(error){
        console.error(error);
    }
}

async function getAmazonPrice(book_name){
    books_data = [];
    const amz_str1="https://www.amazon.in/s?k=";
    const amz_str2="&ref=nb_sb_noss_2";
    book_name = book_name.replace(" ","+");
    const url=amz_str1 + book_name + amz_str2;

    try{
        const response = await axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });

        const $ = cheerio.load(response.data);
        const books=$("div.a-section");
        
        books.each(function(){

        title = $(this).find("span.a-size-medium.a-color-base.a-text-normal").text();
        price = $(this).find("span.a-price-symbol").text() + $(this).find("span.a-price-whole").text();
        description = $(this).find("a.a-size-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-bold").text().trim();
        link = $(this).find("a.a-size-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-bold").attr("href");
        if(title && price && (description=="Paperback" || description=="Hardcover")&& link){
            books_data.push({title, price, description,link});
        }
          

        });

        return books_data;
    }
    catch(error){
        console.error(error);
    }
}

app.post('/compare_prices', (req, res) =>{
    const { book_name } = req.body;

    if(!book_name){
        res.status(418).send({ message: 'Book name is required'})
    }
    (async () => {
        all_sites_data=[];
        flipkart_data = await getFlipkartPrice(book_name);
        amazon_data = await getAmazonPrice(book_name);
        res.status(200).send({"flipkart_data": flipkart_data[0], "amazon_data":amazon_data[0]});
    })();
    
})