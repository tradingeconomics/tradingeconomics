'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.country = null;
global.type = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/******************************************************************************************* 
  parameters:
    String or list: symbol, country 
    String: type, start_date, end_date
        -> type can be:
           earnings, ipo, dividends

  example:
    getEarnings();
    getEarnings(start_date = '2018-02-02');
    getEarnings(country = 'united states');
    getEarnings(symbol ='CMCSA:US', start_date = '2018-02-02');
    getEarnings(symbol ='FARM:US', start_date = '2018-02-01', end_date = '2018-03-01');         
         
*********************************************************************************************/

function getEarnings(){

    try {
        var Data = '';
        var url = '';
          
        if (start_date != null){    
            url =  '/earnings' + '?d1=' + start_date;   
        }
        if (symbol != null){                   
            url =  '/earnings/symbol/' + symbol + '?d1=' + start_date;      
        }
        if(country != null){
            url = '/earnings/country/' + country;
        }
        if (start_date != null && end_date != null){                 
            url =  '/earnings/symbol/' + symbol + '?d1=' + start_date + '&d2=' + end_date;      
        }
        if(country === null && symbol === null && start_date === null && end_date === null){
            url =  '/earnings';
        }
        if(type != null){
            url = '/earnings' + '?type=' + type;
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

module.exports.getEarnings = getEarnings;
