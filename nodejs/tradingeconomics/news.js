'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.limit = null;
global.start = null;

//This function builds the path to get the API request:
/**********************************************************************
   WITHOUT PARAMETERS A LIST OF NEWS WILL BE PROVIDED
   parameters:
    country, indicator, limit, start (list size and start index)
 
   example:
    getNews( ); 
    getNews(country = 'portugal');
    getNews(indicator = 'imports' );        
    getNews(country = 'united states', indicator = 'inflation rate');         
    getNews(limit = '4', start = '2');               

***********************************************************************/

function getNews(){

    var Data = ''; 
    var url = ''; 
   
    if (country != null){    
        url = '/news/country/' + country;    
    }
    if (indicator != null){      
        url = '/news/indicator/' + indicator;    
    }
    if (country != null && indicator != null){     
        url = '/news/country/' + country + '/' + indicator;    
    }  
    if (limit != null && start != null){     
        url =  '/news' + '?limit=' + limit + '&start=' + start;
    }
    if(country === null && indicator === null && limit === null && start === null){
        url = '/news'; 
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

module.exports.getNews = getNews;











