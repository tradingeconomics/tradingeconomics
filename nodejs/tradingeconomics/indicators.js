'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.group = null;


//This function builds the path to get the API request:
/****************************************************************  
   WITHOUT PARAMETERS A LIST OF ALL INDICATORS WILL BE PROVIDED
   parameters:
    String or list: country, indicator, ticker

   example:
    getIndicatorData();
    getIndicatorData(country = ['china', 'portugal']);
    getIndicatorData(indicator ='gdp');        
    getIndicatorData(ticker ='usurtot');
    getIndicatorData(country ='china', group = 'housing');             

*******************************************************************/

function getIndicatorData() {
    
    var url = '';
    var Data = '';
 
    if (country != null){    
        url = '/country/'+ country;    
    }
    if (indicator != null){      
        url = '/country/all/' + indicator;    
    }
    if (ticker != null){     
        url = '/country/ticker/' + ticker;    
    }
    if (country != null && group != null){    
        url = '/country/' + country + '?c=' + apikey + '&group=' + group ;
    }  
    if (country === null && indicator === null && ticker === null){     
        url = '/indicators';
    }
    
    if (url.includes(group)){
        Data = url_base + url .replace (' ','%20');
    }else{
        Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    }
  
    return fetch(Data)
    .then(func.handleErrors)   
    .then(function(response) {    
        return response.json(); // process it inside the `then` when calling the function       
    }).catch(function (err) {
        return err.message;
    });
     
}   

module.exports.getIndicatorData = getIndicatorData;











