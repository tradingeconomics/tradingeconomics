'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;

//This function builds the path to get the API request:
/****************************************************************
   parameters:
    country, indicator, ticker

   example:
    getForecasts(country = ['china', 'portugal']);
    getForecasts(indicator = 'gdp' );        
    getForecasts(ticker ='usurtot' );        
    getForecasts(country ='united states', indicator = 'interest rate');        

******************************************************************/

function getForecasts(){

    try {
        var Data = '';
        var url = '';
       
        if (country != null){    
            url = '/forecast/country/' + country;    
        }
        if (indicator != null){      
            url = '/forecast/indicator/' + indicator;    
        }
        if (ticker != null){     
            url = '/forecast/ticker/' + ticker;    
        }  
        if (country != null && indicator != null){     
            url = '/forecast/country/' + country + '/indicator/' + indicator;
        }
        
        Data = url_base + url + '?c=' + apikey.replace(' ','%20');
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

module.exports.getForecasts = getForecasts;









