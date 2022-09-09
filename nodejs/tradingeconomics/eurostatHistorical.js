'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.id = null;
global.start_date = null;
global.end_date = null;


//This function builds the path to get the API request:
/**************************************************************************************************************  
   parameters:
    String: id
    Datetime: start_date, end_date

   example:
    getEurostatHistorical(id = '24804');
    getEurostatHistorical(id = '24804',start_date = '2017-01-01' );
    getEurostatHistorical(id = '24804',start_date = '2017-01-01' , end_date = '2020-05-05');      

****************************************************************************************************************/

function getEurostatHistorical() {
    
    try {
        var url = '';
        var Data = '';
    
        if (id != null){    
            url = '/eurostat/historical/' + id;
        }    
        if (start_date != null){    
            url =  '/eurostat/historical/' + id + '?d1=' + start_date; 
        }
        if (start_date != null && end_date != null){                   
            url =  '/eurostat/historical/' + id + '?d1=' + start_date + '&d2=' + end_date;   
                    
        }
        date.checkDates(start_date, end_date);  
        
        
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

module.exports.getEurostatHistorical = getEurostatHistorical;











