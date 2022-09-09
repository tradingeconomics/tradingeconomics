'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.type = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String: country
    String: type (can be - 'import' or 'export')

   example:
    getComtradeTotalByType(country = 'Portugal', type = 'import');
    getComtradeTotalByType(country = 'United States', type = 'export');     
   
***********************************************************************************/

function getComtradeTotalByType(){

    try {
        var Data = '';
        var url = '/comtrade';
    
        if (country == null){
            console.log('country is missing');
        }
        if (type == null){
            console.log('type is missing. Choose "import" or "export"');
        }
    
        function getLinkApi(country, type) {
            return `${url_base}${url}/${type}/${country}/totals`;
        }
    
        Data = getLinkApi(country, type);
    
        Data += `?c=${apikey}`;
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

module.exports.getComtradeTotalByType = getComtradeTotalByType;









