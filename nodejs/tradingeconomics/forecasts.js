'use strict'

const auth = require('./auth.js');
const http = require('https');
const func = require('./functions.js');

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
    
    Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    return fetch(Data).then(function(response){
        return response.json(); // process it inside the `then` when calling the function
    });
  
}

module.exports.getForecasts = getForecasts;









