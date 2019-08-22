'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.category = null;
global.series_code = null;
global.page = null;
global.URL = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   WITHOUT PARAMETERS A LIST OF ALL CATEGORIES WILL BE PROVIDED
   parameters:
    country, category, series_code, URL, page

   example:
    getWorldBank();
    getWorldBank(country ='united states');
    getWorldBank(country ='united states', page = '2');
    getWorldBank(category = 'Education' );    
    getWorldBank(category = 'Education', page = '2');    
    getWorldBank(series_code ='fr.inr.rinr' );        
    getWorldBank(URL ='/united-states/real-interest-rate-percent-wb-data.html' );        

***********************************************************************************/

function getWorldBank(){

    var Data = '';
    var url = '';
   
    if (category != null){    
        url = '/worldBank/category/' + category;    
    }
    if (category != null && page != null){      
        url = '/worldBank/category/' + category + '/' + page;    
    }
    if (country != null){     
        url = '/worldBank/country/' + country;    
    }
    if (country != null && page != null){     
        url = '/worldBank/country/' + country + '/' + page;    
    } 
    if (series_code != null){     
        url = '/worldBank/indicator' + '?s=' + series_code;    
    }
    if (URL != null){     
        url = '/worldBank/indicator' + '?url=' + URL;    
    }    
    if(category === null && country === null && series_code === null && page === null && URL === null){     
        url = '/worldBank/categories';
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

module.exports.getWorldBank = getWorldBank;









