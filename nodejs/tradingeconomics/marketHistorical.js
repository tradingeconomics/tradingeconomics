'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  parameters:
    symbol, start_date, end_date

  example:
    getHistoricalMarkets(symbol ='aapl:us');
    getHistoricalMarkets(symbol =['aapl:us', 'indu:ind']);
    getHistoricalMarkets(symbol ='indu:ind', start_date = '2018-02-02', end_date = '2019-02-02');         
    getHistoricalMarkets(symbol ='aapl:us', start_date = '2018-02-02' );      

******************************************************************************************************************************/

function getHistoricalMarkets(){

    try {
        var url = '';
        var Data = '';
    
        if (symbol != null){    
            url = '/markets/historical/' + symbol;
        }    
        if (start_date != null){    
            url =  '/markets/historical/' + symbol + '?d1=' + start_date; 
        }
        if (start_date != null && end_date != null){                   
            url =  '/markets/historical/' + symbol + '?d1=' + start_date + '&d2=' + end_date;            
        }
       
        
        date.checkDates(start_date, end_date); 
        
        if(url.includes('?')){
            Data = url_base + url + '&c='+ apikey.replace (' ','%20');
        }else{
            Data = url_base + url + '?c='+ apikey.replace (' ','%20');
        }
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

module.exports.getHistoricalMarkets = getHistoricalMarkets;

