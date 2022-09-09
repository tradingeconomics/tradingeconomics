'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');


//This function builds the path to get the API request:
/***************************************************************************************************************  
    example:
        getCalendarUpdates();

****************************************************************************************************************/

function getCalendarUpdates(){
    try {
        
        var Data = '';
        var url = '/calendar/updates/';

        Data = url_base + url + '?c=' + apikey.replace (' ','%20');

    //     return fetch(Data)
    //     .then(func.handleErrors)   
    //     .then(function(response) {      
    //         return response.json(); // process it inside the `then` when calling the function
                    
    //     }).catch(function (err) {
    //         return err.message;
    // });
        return func.makeTheRequest(Data)
        
    } catch (error) {
        throw error    
    }
} 

module.exports.getCalendarUpdates = getCalendarUpdates;











