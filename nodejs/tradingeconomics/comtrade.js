'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.category = null;
global.country = null;
global.country1 = null;
global.symbol = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String or list: country, country1, symbol
    String: category(can be - 'categories' or 'countries' for a list of data)

   example:
    getComtrade(category = 'categories');
    getComtrade(country ='united states');
    getComtrade(country = 'china' );       
    getComtrade(symbol ='PRTESP24031' );              
    getComtrade(country ='china', country1 = 'united states');              

***********************************************************************************/

function getComtrade(){

    try {
        var Data = '';
        var url = '';
    
        if (category === 'categories'){    
            url =  '/comtrade/categories'; 
        }
        if (category === 'updates'){     
            url = '/comtrade/updates';   
        }
        if (category === 'countries'){      
            url = '/comtrade/countries';    
        }
        if (country != null){     
            url = '/comtrade/country/' + country;    
        }
        if (country != null && country1 != null){     
            url = '/comtrade/country/' + country + '/' + country1;    
        }
        if (symbol != null){     
            url = '/comtrade/historical/' + symbol;    
        }
        
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

module.exports.getComtrade = getComtrade;









