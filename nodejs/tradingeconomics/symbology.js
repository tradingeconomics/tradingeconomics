'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');


//setting global variables to be used outside this module
global.symbol = null;
global.ticker = null;
global.isin = null;


//This function builds the path to get the API request:
/******************************************************************************************************
   parameters:
    symbol (string), ticker (string), isin (string)

   example:
    getSymbology(symbol = 'aapl:us');
    getSymbology(ticker = 'aapl');
    getSymbology(isin = 'US0378331005');
    
*******************************************************************************************************/

function getSymbology(){

    try {
        var Data = '';
        var url = '';
        if(arguments.length !== 1){
          console.log("Please only 1 argument is accepted (ex:symbol, ticker or isin)")
          return null
        }else{
    
          if (symbol !== null){    
            url = '/markets/symbology/symbol/' + symbol.toLowerCase();    
        }
        if (ticker !== null){      
            url = '/markets/symbology/ticker/' + ticker.toLowerCase();    
        }
        if (isin !== null){     
            url = '/markets/symbology/isin/' + isin.toLowerCase();    
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
        }
    } catch (error) {
        throw error
    }
}

module.exports.getSymbology = getSymbology;


  









