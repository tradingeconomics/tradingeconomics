'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.category = null;
global.category_group = null;
global.lists = null;



//This function builds the path to get the API request:
/**************************************************************************************************************  
   parameters:
    String: country, category, category_group, lists

   example:
    getEurostatData(lists = 'categories');
    getEurostatData(lists = 'countries');
    getEurostatData(country ='Denmark');        
    getEurostatData(category ='People at risk of income poverty after social transfers');        
    getEurostatData(category_group ='Poverty');        
    getEurostatData(country ='Denmark', category = 'People at risk of income poverty after social transfers');
    getEurostatData(country ='Denmark', category_group = 'Poverty');             

****************************************************************************************************************/

function getEurostatData() {
    
    try {
        var url = '';
        var Data = '';
     
        if (lists != null){
            if (lists == 'countries'){
                url = '/eurostat/countries'
            }    
            if (lists == 'categories'){
                url = '/eurostat/categories'
            }     
        }
        if (country != null){      
            url = '/eurostat/country/' + country;    
        }
        if (category_group != null){     
            url = '/eurostat' + '?c=' + apikey + '&category_group=' + category_group;    
        }
        if (category != null){     
            url = '/eurostat' + '?c=' + apikey + '&category=' + category;    
        }
        if (country != null && category_group != null){    
            url = '/eurostat/country/' + country + '?c=' + apikey + '&category_group=' + category_group ;
        }  
        if (country != null && category != null){    
            url = '/eurostat/country/' + country + '?c=' + apikey + '&category=' + category ;
        } 
       
        
        if (url.includes(category_group) || url.includes(category)){
            Data = url_base + url .replace (' ','%20');
        }else{
            Data = url_base + url + '?c=' + apikey.replace (' ','%20');
        }
      
        // return fetch(Data)
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
        return func.makeTheRequest(Data)
    } catch (error) {
        throw error
    }
     
}   

module.exports.getEurostatData = getEurostatData;











