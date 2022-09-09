'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variable to be used outside this module
global.start_date = null;
global.country = null;
global.time = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  WITHOUT PARAMETERS A LIST OF THE LATEST UPDATES WILL BE PROVIDED
  parameters:
    String: start_date, country, time(hh:mm)

  example:
    getLatestUpdates(); 
    getLatestUpdates(start_date = '2018-02-02');
    getLatestUpdates(start_date = '2018-02-02', country='china');
    getLatestUpdates(start_date = '2021-10-18', time='15:20');            

******************************************************************************************************************************/

function getLatestUpdates(){

  try {
    var Data = '';
    var url = '';
    
    if(start_date === null && country === null && time !== null){
       console.error('Insert valid date');
       process.exit()
    }
    if (start_date != null && country === null){              
        url = '/updates/' + start_date;    
    }
    if(country != null){
        url = '/updates/country/' + country;
    } 
    if(start_date != null && country != null){
        url = '/updates/country/' + country + '/' + start_date
    } 
    if(start_date === null && country === null){
        url = '/updates'
    }
    
    date.checkDates(start_date); 
    Data = url_base + url + '?c=' + apikey.replace (' ','%20');
  
   if(start_date != null && time != null){
       var truth = func.checkTime(time)
       if(truth){
           Data += '&time=' + time
       }else{
           console.error('Invalid time, use hh:mm format')
           process.exit()
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

module.exports.getLatestUpdates = getLatestUpdates;










