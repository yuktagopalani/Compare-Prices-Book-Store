const express = require('express');
const router = express.Router();

var flipkart = require('../scrapping/flipkart_product');
var amazon = require('../scrapping/amazon_product');

router.post('/compare_prices', (req, res) =>{
    const { book_name } = req.body;

    if(!book_name){
        res.status(418).send({ message: 'Book name is required'})
    }
    (async () => {

        flipkart_data = await flipkart.getFlipkartPrice(book_name);
        amazon_data = await amazon.getAmazonPrice(book_name);
        res.status(200).send({"flipkart_data": flipkart_data, "amazon_data":amazon_data});
    })();
    
})
exports.router = router;