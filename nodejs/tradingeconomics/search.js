'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.category = null;
global.term = null;

//This function builds the path to get the API request:
/****************************************************************
   parameters:
    category, term

   example:
    getSearch()
    getSearch(term='japan', category = 'markets')
    getSearch(term = 'gold')      

******************************************************************/

function getSearch(){

    try {
        var Data = '';
        var url = '';
       
        if (term === null && category === null){    
            url = '/search/categories/';    
        }
        if (term != null){    
            url = '/search/' + term;    
        }
        if (term != null && category != null){   
            url = '/search/' + term +'?category=' + category;    
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

module.exports.getSearch = getSearch;









