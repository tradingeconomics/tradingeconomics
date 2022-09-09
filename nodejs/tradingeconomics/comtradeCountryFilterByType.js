'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country1 = null;
global.country2 = null;
global.type = null;


//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String: country1, country2
    String: type (can be - 'import' or 'export')

    Notes: 
    'country2' parameters is optional.
    
   example:
    getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import');
    getCmtCountryFilterByType(country1 = 'United States', type = 'export');
   
***********************************************************************************/

function getCmtCountryFilterByType(){

    try {
        var Data = '';
        var url = '/comtrade/country';
    
        if (country1 == null){
            console.log('country is missing') ;
        }
        if (type == null){
            console.log('type is missing. Choose "import" or "export"') ;
        }
    
        function getLinkApi(country1, country2) {
            
            if(country2 == null){
                return `${url_base}${url}/${country1}`;
            }
            return `${url_base}${url}/${country1}/${country2}`;
        }
    
        Data = getLinkApi(country1, country2);
    
        Data += `?type=${type}&c=${apikey}`;
        Data = Data.replace (' ','%20');
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

module.exports.getCmtCountryFilterByType = getCmtCountryFilterByType;









