'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.start_date = null;
global.end_date = null;
global.agr = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  parameters:
    symbol, start_date, end_date

  example:
    getMarketsIntraday(symbol ='aapl:us');
    getMarketsIntraday(symbol =['aapl:us', 'indu:ind']);
    getMarketsIntraday(symbol ='indu:ind', start_date = '2018-02-01', end_date = '2025-03-01');
    getMarketsIntraday(symbol ='indu:ind', start_date = '2018-02-01', end_date = '2025-02-02', agr = '10m');            
    getMarketsIntraday(symbol ='aapl:us', start_date = '2018-02-02' );
     

******************************************************************************************************************************/

function getMarketsIntraday(){
    
    try {
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
        if (start_date != null && end_date != null && agr != null){                   
            url =  '/markets/intraday/' + symbol + '?agr=' + agr + '&d1=' + start_date + '&d2=' + end_date;      
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

module.exports.getMarketsIntraday = getMarketsIntraday;
