const express = require('express');
const app = express();
const port = 8080;
const cheerio = require("cheerio");
const axios = require("axios");


app.use(express.json())

// app.listen(
//     port,
//     () => console.log(`its alive on http://localhost:${port}`)
// )

async function getFlipkartPrice(book_name, books_data){
    const flp_str1="https://www.flipkart.com/search?q=";
    const flp_str2="&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&p%5B%5D=facets.language%255B%255D%3DEnglish";
    book_name = book_name.replace(" ","+");
    const url=flp_str1 + book_name + flp_str2;
    // try{
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

        // console.log(books_data);

    // }
    // catch(error){
    //     console.error(error);
    //     return [];
    // }
   
    // 
    // return books_data;
    
}
books_data=[];

(async () => {
    await getFlipkartPrice('ikigai',books_data);
  })()
console.log(books_data);

// app.post('/compare_prices', (req, res) =>{
//     const { book_name } = req.body;

//     if(!book_name){
//         res.status(418).send({ message: 'Book name is required'})
//     }
//     books_data=getFlipkartPrice(book_name);
//     res.status(200).send(books_data);
// })