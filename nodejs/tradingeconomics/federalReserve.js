'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.counties = null;
global.country = null;
global.symbol = null;
global.county = null;
global.state = null;
global.URL = null;
global.historical_symbol = null;

//This function builds the path to get the API request:
/****************************************************************************************************  
   parameters:
    country, county, counties, states, symbol, URL, state, pike, historical(symbol)

   example:
    getFred();
    getFred(counties = 'pike');
    getFred(country ='united states');
    getFred(country = 'united states' );       
    getFred(symbol ='AGEXMAK2A647NCEN' );              
    getFred(URL ='/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html' );              
    getFred(county ='pike' );              
    getFred(state ='tennessee' );                           
    getFred(historical_symbol ='RACEDISPARITY005007' );              

******************************************************************************************************/

function getFred(){

    var Data = '';
    var url = '';

    if ((counties, country, county, symbol, URL, state, historical_symbol) === null){    
        url =  '/fred/states'; 
    }
    if (counties != null){      
        url = '/fred/counties/' + counties;    
    }
    if (symbol != null){     
        url = '/fred/snapshot/symbol/' + symbol;    
    }
    if (URL != null){     
        url = '/fred/snapshot/url' + '?url=' + URL;    
    }
    if (country != null){     
        url = '/fred/snapshot/country/' + country;    
    }
    if(state != null){
        url = '/fred/snapshot/state/' + state;
    }
    if(county != null){
        url = '/fred/snapshot/county/' + county;
    }
    if(historical_symbol != null){
        url = '/fred/historical/' + historical_symbol;
    }
    
    if(url.includes('?')){
        Data = url_base + url + '&c='+ apikey.replace (' ','%20');
    }else{
        Data = url_base + url + '?c='+ apikey.replace (' ','%20');
    }
 
    return fetch(Data)
    .then(func.handleErrors)   
    .then(function(response) {    
        return response.json(); // process it inside the `then` when calling the function       
    }).catch(function (err) {
        return err.message;
    });
   

}

module.exports.getFred = getFred;









