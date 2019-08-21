'use strict'

const auth = require('./auth.js');
const http = require('https');
const func = require('./functions.js');

//setting global variables to be used outside this module
global.counties = null;
global.country = null;
global.symbol = null;
global.page = null;
global.county = null;
global.state = null;
global.pike = null;
global.URL = null;
global.historical_symbol = null;

//This function builds the path to get the API request:
/****************************************************************************************************  
   parameters:
    country, county, counties, states, page, symbol, URL, state, pike, historical(symbol)

   example:
    getFred();
    getFred(counties = 'arkansas');
    getFred(country ='united states', page = '2');
    getFred(country = 'united states' );       
    getFred(symbol ='AGEXMAK2A647NCEN' );              
    getFred(URL ='/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html' );              
    getFred(county ='arkansas' );              
    getFred(state ='tennessee' );              
    getFred(pike ='pike' );              
    getFred(historical_symbol ='RACEDISPARITY005007' );              

******************************************************************************************************/

function getFred(){

    var Data = '';
    var url = '';

    if ((counties, country, county, symbol, URL, state, pike, historical_symbol) === null){    
        url =  '/fred/states'; 
    }
    if (counties != null){      
        url = '/fred/counties/' + counties;    
    }
    if (country != null){     
        url = '/fred/snapshot/country/' + country;    
    }
    if (country != null && page != null){     
        url = '/fred/snapshot/country/' + country + '/' + page;    
    } 
    if (symbol != null){     
        url = '/fred/snapshot/symbol/' + symbol;    
    }
    if (URL != null){     
        url = '/fred/snapshot/url' + '?url=' + URL;    
    }
    if(state != null){
        url = '/fred/snapshot/state/' + state;
    }
    if(county != null){
        url = '/fred/snapshot/county/' + county;
    }
    if(pike != null){
        url = '/fred/snapshot/county/Pike%20County,%20AR';
    }
    if(historical_symbol != null){
        url = '/fred/historical/' + historical_symbol;
    }
    
    if(url.includes('?')){
        Data = url_base + url + '&c='+ apikey.replace (' ','%20');
    }else{
        Data = url_base + url + '?c='+ apikey.replace (' ','%20');
    }

    return fetch(Data).then(function(response){
        return response.json(); // process it inside the `then` when calling the function
    });

}

module.exports.getFred = getFred;









