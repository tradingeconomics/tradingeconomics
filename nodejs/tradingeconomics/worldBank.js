'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.category = null;
global.series_code = null;
global.URL = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   WITHOUT PARAMETERS A LIST OF ALL CATEGORIES WILL BE PROVIDED
   parameters:
    country, category, series_code, URL

   example:
    getWorldBank();
    getWorldBank(country ='united states');
    getWorldBank(category = 'Education');       
    getWorldBank(series_code ='fr.inr.rinr');        
    getWorldBank(URL ='/united-states/real-interest-rate-percent-wb-data.html');        

***********************************************************************************/

function getWorldBank(){

    try {
        var Data = '';
        var url = '';
       
        if (category != null){    
            url = '/worldBank/category/' + category;    
        }
        if (country != null){     
            url = '/worldBank/country/' + country;    
        }
        if (series_code != null){     
            url = '/worldBank/indicator' + '?s=' + series_code;    
        }
        if (URL != null){     
            url = '/worldBank/indicator' + '?url=' + URL;    
        }    
        if(category === null && country === null && series_code === null && URL === null){     
            url = '/worldBank/categories';
        }
    
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

module.exports.getWorldBank = getWorldBank;









