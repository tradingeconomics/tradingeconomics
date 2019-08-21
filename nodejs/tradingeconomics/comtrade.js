'use strict'

const auth = require('./auth.js');
const http = require('https');
const func = require('./functions.js');

//setting global variables to be used outside this module
global.category = null;
global.country = null;
global.country1 = null;
global.page = null;
global.symbol = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String or list: country, country1, symbol
    String: category(can be - 'categories' or 'countries' for a list of data), page

   example:
    getComtrade(category = 'categories');
    getComtrade(country ='united states', page = '2');
    getComtrade(country = 'china' );       
    getComtrade(symbol ='PRTESP24031' );              

***********************************************************************************/

function getComtrade(){

    var Data = '';
    var url = '';

    if (category === 'categories'){    
        url =  '/comtrade/categories'; 
    }
    if(category === 'countries'){      
        url = '/comtrade/countries';    
    }
    if (country != null){     
        url = '/comtrade/country/' + country;    
    }
    if (country != null && page != null){     
        url = '/comtrade/country/' + country + '/' + page;    
    } 
    if (country != null && country1 != null && page != null){     
        url = '/comtrade/country/' + country + '/' + country1 + '/' + page;    
    }
    if (symbol != null){     
        url = '/comtrade/historical/' + symbol;    
    }

    Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    return fetch(Data).then(function(response){
        return response.json(); // process it inside the `then` when calling the function
    });

}

module.exports.getComtrade = getComtrade;









