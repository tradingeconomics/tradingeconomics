//setting requirments
var auth = require('./auth.js');
var http = require('https');


//importing variables from file './auth.js'
const getMarketCommodity = require('./auth.js').getMarketCommodity;
const getMarketCurrency =require('./auth.js').getMarketCurrency;
const getMarketIndex = require('./auth.js').getMarketIndex;
const getMarketBond = require('./auth.js').getMarketBond;
const getMarketSymbol = require('./auth.js').getMarketSymbol;
const getMarketComponent = require('./auth.js').getMarketComponent;


//function to get the chunk of data on response an put it on the buffer
callback = function(response) {
    buffer = '';
    response.on('data', function (chunk) {
    buffer += chunk;
    
});
//response
response.on('end', function () {
    // your code here if you want to use the results !

    console.log(buffer)//example, showing it on the console
    console.log(" ")
    console.log("*******************MARKETS**********************")
    console.log(" ")
});
}
//getting the http request, and after - end task
var req = http.get(auth.getMarketCommodity, callback).end();
var req = http.get(auth.getMarketCurrency, callback).end();
var req = http.get(auth.getMarketIndex, callback).end(); 
var req = http.get(auth.getMarketBond, callback).end(); 
var req = http.get(auth.getMarketSymbol, callback).end(); 
var req = http.get(auth.getMarketComponent, callback).end(); 







