'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.limit = null;
global.start = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/**********************************************************************
   WITHOUT PARAMETERS A LIST OF NEWS WILL BE PROVIDED
   parameters:
    country, indicator, limit, start (list size and start index), start_date, end_date
 
   example:
    getNews();
    getNews(start_date = '2021-02-02', end_date = '2021-03-03') 
    getNews(country = 'united states');
    getNews(country = 'united states', start_date = '2021-02-02', end_date = '2021-03-03');
    getNews(indicator = 'inflation rate');        
    getNews(indicator = 'inflation rate', start_date = '2021-02-02', end_date = '2021-03-03');        
    getNews(country = 'united states', indicator = 'inflation rate');         
    getNews(country = 'united states', indicator = 'inflation rate', start_date = '2021-02-02', end_date = '2021-03-03');         
    getNews(limit = '15', start = '10');               

***********************************************************************/

function getNews(){

    try {
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
            if(start_date === null || end_date === null){
                Data = url_base + url + '?c='+ apikey.replace (' ','%20');
            }else{
                Data = url_base + url + '?c='+ apikey.replace (' ','%20')+ '&d1=' + start_date + '&d2=' + end_date;
            }
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

module.exports.getNews = getNews;











