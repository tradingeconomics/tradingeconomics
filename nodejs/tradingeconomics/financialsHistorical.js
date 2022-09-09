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
    getFinancialsHistorical(symbol = 'aapl:us', category = 'assets');
             

***********************************************************************************/

function getFinancialsHistorical(){

    try {
        var Data = '';
        var url = '';
    
        
        if (symbol != null && category != null){     
            url = '/financials/historical/' + symbol + ':' + category;    
        }
        
        Data = url_base + url + '?c=' + apikey.replace (' ','%20');
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

module.exports.getFinancialsHistorical = getFinancialsHistorical;









