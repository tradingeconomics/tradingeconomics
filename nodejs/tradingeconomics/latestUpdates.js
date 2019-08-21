'use strict'

const auth = require('./auth.js');
const http = require('https');
const date = require('./functions.js');
const func = require('./functions.js');

//setting global variable to be used outside this module
global.start_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  WITHOUT PARAMETERS A LIST OF THE LATEST UPDATES WILL BE PROVIDED
  parameters:
    start_date

  example:
    getLatestUpdates(); 
    getLatestUpdates(start_date = '2018-02-02');         

******************************************************************************************************************************/

function getLatestUpdates(){

  var Data = '';
  var url = '';
   
  if (start_date != null){              
      url = '/updates/' + start_date;    
  } 
  else{
      url = '/updates'
  } 

  date.checkDates(start_date); 
  Data = url_base + url + '?c=' + apikey.replace (' ','%20');
  return fetch(Data).then(function(response){
    return response.json(); // process it inside the `then` when calling the function
});
 
}

module.exports.getLatestUpdates = getLatestUpdates;














