'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variable to be used outside this module
global.series_code = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    series_code

   example:    
    getWorldBankHistorical(series_code = 'usa.fr.inr.rinr' ); 
************************************************************************************/

var getWorldBankHistorical = function(){
   
    try {
	var url = '';
	    var Data = '';
	
	    if (series_code){    
	        url = '/worldBank/historical' + '?s=' + series_code;    
	    }
	    
	    Data = url_base + url + '&c=' + apikey.replace (' ','%20');
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

module.exports.getWorldBankHistorical = getWorldBankHistorical;












