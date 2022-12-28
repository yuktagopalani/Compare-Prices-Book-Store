const express = require('express');
const app = express();
const port = 8080;


var compare_prices = require('./routes/compare_prices');
var best_sellers = require('./routes/best_sellers');


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

// -----listen to port------
app.listen(
    port,
    () => console.log(`its alive on http://localhost:${port}`)
)