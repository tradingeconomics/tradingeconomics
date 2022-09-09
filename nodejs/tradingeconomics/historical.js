'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  parameters:
    String or list: country, indicator, ticker, start_date, end_date

  example:
    getHistoricalData(country = ['china', 'portugal'], indicator = 'gdp');
    getHistoricalData(country ='china', indicator = 'gdp', start_date = '2018-02-02');
    getHistoricalData(country =['china', 'portugal'], indicator = 'gdp', start_date = '2018-02-02', end_date = '2019-02-02');         
    getHistoricalData(ticker ='usurtot', start_date = '2018-02-02' );      

******************************************************************************************************************************/

function getHistoricalData(){

    try {
        var url = '';
        var Data = '';
    
        if (country != null && indicator != null){    
            url = '/historical/country/' + country + '/indicator/' + indicator;    
        }
        if (start_date != null){    
            url =  '/historical/country/' + country + '/indicator/' + indicator + '/' + start_date;    
        }
        if (start_date != null && end_date != null){                   
            url =  '/historical/country/' + country + '/indicator/' + indicator + '/' + start_date + '/' + end_date;        
        }
        if (ticker != null && start_date != null){              
            url = '/historical/ticker/' + ticker + '/' + start_date;    
        } 
        
        date.checkDates(start_date, end_date); 
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

module.exports.getHistoricalData = getHistoricalData;


  








