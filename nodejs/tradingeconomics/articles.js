'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.limit = null;
global.start = null;
global.id = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/**************************************************************************
   WITHOUT PARAMETERS A LIST OF ARTICLES WILL BE PROVIDED
   parameters:
    String or list: country, indicator, id 
    String: limit, start (list size and start index)
 
   example:
    getArticles( ); 
    getArticles( id = '20580'); 
    getArticles(country = 'portugal');
    getArticles(country = 'portugal', start_date = '2019-02-02', end_date = '2019-03-03');
    getArticles(indicator = ['imports', 'Interest Rate']);       
    getArticles(country = 'united states', indicator = 'inflation rate');         
    getArticles(limit = '4', start = '2');               

***************************************************************************/

function getArticles(){
   
    var Data = '';
    var url = '';

    if (country != null){    
        url = '/articles/country/' + country;    
    }
    if (country != null && start_date != null && end_date != null){    
        url = '/articles/country/' + country + '/from/' + start_date + '/' + end_date;    
    }
    if (indicator != null){      
        url = '/articles/indicator/' + indicator;    
    }
    if (country != null && indicator != null){     
        url = '/articles/country/' + country + '/' + indicator;    
    }  
    if (limit != null && start != null){     
        url =  '/articles' + '?lim=' + limit + '&start=' + start;
    }
    if(country === null && indicator === null && limit === null && start === null){
        url = '/articles'; 
    }
    if (id != null){     
        url =  '/articles/id/' + id;
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

module.exports.getArticles = getArticles;










