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
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************  
   parameters:
    country, county, counties, states, symbol, URL, state, pike, historical(symbol), start_date, end_date

   example:
    getFred();
    getFred(counties = 'arkansas');
    getFred(country ='united states');      
    getFred(symbol ='ALLMARGATTN');              
    getFred(url ='/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html' );              
    getFred(county ='pike' );              
    getFred(state ='tennessee' );                           
    getFred(historical_symbol ='RACEDISPARITY005007');
    getFred(historical_symbol = 'RACEDISPARITY005007', start_date='2017-05-01')
    getFred(historical_symbol = 'RACEDISPARITY005007', start_date='2017-05-01', end_date='2025-12-31')              

******************************************************************************************************/

function getFred(){

    try {
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
            url = '/fred/snapshot/url?';    
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
            if(url.includes('url?')){
                Data = url_base + url + 'c='+ apikey.replace (' ','%20')+'&url=' + URL;
            }else{
            Data = url_base + url + '&c='+ apikey.replace (' ','%20');
        }
        }else{
            if (url.includes('/historical/')){
                if(start_date !== null && end_date == null){
                    Data = url_base + url + '?c='+ apikey.replace (' ','%20')+'&d1=' + start_date;
                }else if(start_date !== null && end_date !== null){
                    Data = url_base + url + '?c='+ apikey.replace (' ','%20')+'&d1=' + start_date + '&d2=' + end_date;
                }else{
                    Data = url_base + url + '?c='+ apikey.replace (' ','%20');
                }
        }else{
            Data = url_base + url + '?c='+ apikey.replace (' ','%20');
        }
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

module.exports.getFred = getFred;









