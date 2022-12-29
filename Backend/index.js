const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 8080;

var compare_prices = require('./routes/compare_prices');
var best_sellers = require('./routes/best_sellers');
var genres = require('./routes/genres');
var book_by_genre = require('./routes/book_by_genre');

// ---- middlewares------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--- Add headers in order to perform all operation on API
// ---Because CORS Thing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
  
    next();
  });

// -----routes-------
app.use("/api/v1", compare_prices.router);
app.use("/api/v1", best_sellers.router);
app.use("/api/v1", genres.router);
app.use("/api/v1", book_by_genre.router);

// -----listen to port------
app.listen(
    port,
    () => console.log(`its alive on http://localhost:${port}`)
);
