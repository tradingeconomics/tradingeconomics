'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.category = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String: symbol
    String: category

   example:
    getFinancialsHistoricalData(symbol = 'aapl:us', category = 'assets').then(data => console.log(data));
             

***********************************************************************************/

function getFinancialsHistorical(){

    var Data = '';
    var url = '';

    
    if (symbol != null && category != null){     
        url = '/financials/historical/' + symbol + ':' + category;    
    }
    
    Data = url_base + url + '?c=' + apikey.replace (' ','%20');
  
    return fetch(Data)
    .then(func.handleErrors)   
    .then(function(response) {    
        return response.json(); // process it inside the `then` when calling the function       
    }).catch(function (err) {
        return err.message;
    });
   
}

module.exports.getFinancialsHistorical = getFinancialsHistorical;









