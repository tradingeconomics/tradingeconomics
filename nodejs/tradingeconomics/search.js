'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.category = null;
global.search_term = null;

//This function builds the path to get the API request:
/****************************************************************
   parameters:
    category, search_term

   example:
    search(category = 'markets')
    search(search_term = 'gold')      

******************************************************************/

function getSearch(){

    var Data = '';
    var url = '';
   
    if (search_term === null && category === null){    
        url = '/search/categories/';    
    }
    if (search_term != null){    
        url = '/search/' + search_term;    
    }
    if (search_term != null && category != null){   
        url = '/search/' + search_term +'?category=' + category;    
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

module.exports.getSearch = getSearch;









