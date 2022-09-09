'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.type = null;
global.category = null;


//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String: country
    String: type (can be - 'import' or 'export')
    String: category (can be - 'live animals', 'Swine, live', 'Sheep and goats, live')

    Notes: 
    'country' and 'type' parameters are not optional.
    if 'category' is None, returns total exports or imports with main category

   example:
    getCmtCountryByCategory(country = 'Portugal', type = 'import');
    getCmtCountryByCategory(country = 'United States', type = 'export', category = 'live animals');
    getCmtCountryByCategory(country = 'Brazil', type = 'import', category = 'Swine, live');       

   
***********************************************************************************/

function getCmtCountryByCategory(){

    try {
        var Data = '';
        var url = '/comtrade';
    
        if (country == null){
            console.log('country is missing') ;
        }
        if (type == null){
            console.log('type is missing. Choose "import" or "export"') ;
        }
    
        function getLinkApi(country, type, category) {
            
            if(category == null){
                return `${url_base}${url}/${type}/${country}`;
            }
            return `${url_base}${url}/${type}/${country}/${category}`;
        }
    
        Data = getLinkApi(country, type, category);
    
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

module.exports.getCmtCountryByCategory = getCmtCountryByCategory;









