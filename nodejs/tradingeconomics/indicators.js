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

        my_data = getIndicatorData();
        my_data = getIndicatorData(country = ['china', 'portugal']);
        my_data = getIndicatorData(indicator ='gdp');        
        my_data = getIndicatorData(ticker ='usurtot');
        my_data = getIndicatorData(country ='china', group = 'housing');             

*******************************************************************/
function getIndicatorData() {
    try {
        
        var url = '';
        var Data = '';
     
        if (country != null){    
            url = '/country/'+ country;    
        }
        if (indicator != null && country ==null){      
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
    
        return func.makeTheRequest(Data)
    } catch (error) {
        // console.log(error);
        throw error
    }
    
    
     
}

//This function builds the path to get the API request:
/****************************************************************  
   WITHOUT PARAMETERS A LIST OF DISCONTINUED SERIES FOR ALL COUNTRIES WILL BE PROVIDED
   
   parameters:
    String or list: country

   example:

        my_data = getDiscontinuedIndicators();
        my_data = getDiscontinuedIndicators(country= 'united states')
        my_data = getDiscontinuedIndicators(country = ['china', 'portugal']);
    
*******************************************************************/
function getDiscontinuedIndicators(country=null) {

    try {
        var d = {
            'url_base': 'https://api.tradingeconomics.com/country',
            'country': '/all',
            'discontinued_tag' : '/discontinued',
            'key': `?c=${apikey}`,
            'output_type' : ''
        }
    
        var data = '';
        
        if (country != null){
            d.country = `/${country}`
        }
        data = `${d.url_base}${d.country}${d.discontinued_tag}${d.key}`;
        
    
        // return fetch(data.replace(' ', '%20'))
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
        return func.makeTheRequest(data)
    } catch (error) {
        throw error
    }
}

/****************************************************************  
   Example:

        my_data = getHistoricalUpdates();

*******************************************************************/

function getHistoricalUpdates() {
    
    try {
        var url = '/historical/updates';
        var Data = '';
    
        Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    
        // return fetch(Data)
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
        return func.makeTheRequest(Data)
    } catch (error) {
        throw error
    }
     
}

/****************************************************************  
   A LIST OF ALL COUNTRIES WILL BE PROVIDED
   parameters:
    
   example:

        countries = getAllCountries();
                    
*******************************************************************/
function getAllCountries() {
    
    try {
        var url_base = 'https://api.tradingeconomics.com/country';
        
        
        var url = url_base + '?c=' + apikey.replace (' ','%20');
      
        // return fetch(url)
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
        return func.makeTheRequest(url)

    } catch (error) {
        throw error
    }
     
}

// module.exports.getAllCountries = getAllCountries;
// module.exports.getIndicatorData = getIndicatorData;
// module.exports.getDiscontinuedIndicators = getDiscontinuedIndicators
// module.exports.getHistoricalUpdates = getHistoricalUpdates

module.exports = {getAllCountries,getIndicatorData,getDiscontinuedIndicators,getHistoricalUpdates}