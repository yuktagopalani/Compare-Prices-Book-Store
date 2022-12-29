const express = require('express');
const router = express.Router();

var scrapping_best_sellers = require('../scrapping/best_sellers');
var amazon_bestsellers = require('../constants/amazon_bestsellers');
router.get('/best_sellers', (req, res) =>{
    (async () => {
        best_sellers = await scrapping_best_sellers.getBestSellers(amazon_bestsellers);
        res.status(200).send(best_sellers);
    })();
    
})
exports.router = router;
