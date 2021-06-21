'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;


//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String or list: symbol

   example:
   te.getFinancialsData(symbol = 'aapl:us').then(data => console.log(data)); 
   te.getFinancialsData(symbol = 'aapl:us,ea:us').then(data => console.log(data));
          
***********************************************************************************/

function getFinancialsData(){

    var Data = '';
    var url = '';

    if (symbol != null){     
        url = '/financials/symbol/' + symbol;    
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


module.exports.getFinancialsData = getFinancialsData;










