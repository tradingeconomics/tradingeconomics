'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.category = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  parameters:
    symbol, category

  example:
    getMarketsForecast(symbol ='aapl:us');
    getMarketsIntraday(symbol =['aapl:us', 'indu:ind']);
    getMarketsForecast(category ='index');   

******************************************************************************************************************************/

function getMarketsForecast(){
    
    try {
        var Data = '';
        var url = '';
    
        if (category != null){    
            url = '/markets/forecasts/' + category;
        }    
        if (symbol != null){    
            url =  '/markets/forecasts/symbol/' + symbol;   
        }
    
        Data = url_base + url + '?c='+ apikey.replace (' ','%20');
        return func.makeTheRequest(Data)
        // return fetch(Data)
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
    } catch (error) {
        throw error
    }
   
   
}

module.exports.getMarketsForecast = getMarketsForecast;

