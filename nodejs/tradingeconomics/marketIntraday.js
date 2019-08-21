'use strict'

const auth = require('./auth.js');
const http = require('https');
const date = require('./functions.js');
const func = require('./functions.js');

//setting global variables to be used outside this module
global.symbol = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  parameters:
    symbol, start_date, end_date

  example:
    getMarketsIntraday(symbol ='aapl:us');
    getMarketsIntraday(symbol =['aapl:us', 'indu:ind']);
    getMarketsIntraday(symbol ='indu:ind', start_date = '2018-02-01', end_date = '2019-03-01');         
    getMarketsIntraday(symbol ='aapl:us', start_date = '2018-02-02' );      

******************************************************************************************************************************/

function getMarketsIntraday(){
    
    var Data = '';
    var url = '';

    if (symbol != null){    
        url = '/markets/intraday/' + symbol;
    }    
    if (start_date != null){    
        url =  '/markets/intraday/' + symbol + '?d1=' + start_date;   
    }
    if (start_date != null && end_date != null){                   
        url =  '/markets/intraday/' + symbol + '?d1=' + start_date + '&d2=' + end_date;      
    }
   
    date.checkDates(start_date, end_date); 

    if(url.includes('?')){
        Data = url_base + url + '&c='+ apikey.replace (' ','%20');
    }else{
        Data = url_base + url + '?c='+ apikey.replace (' ','%20');
    }
    return fetch(Data).then(function(response){
        return response.json(); // process it inside the `then` when calling the function
    });
   
}

module.exports.getMarketsIntraday = getMarketsIntraday;

