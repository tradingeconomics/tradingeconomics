'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variable to be used outside this module
global.ticker = null;
global.country = null;
global.category = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  WITHOUT PARAMETERS A LIST OF THE LATEST UPDATES WILL BE PROVIDED
  parameters:
    String: ticker, country, category

  example:
    getPeers(ticker ='CPI YOY');
    getPeers(country ='united states');
    getPeers(country ='united states', category ='money');


******************************************************************************************************************************/

function getPeers(){

  try {
    var Data = '';
    var url = '';
    
    if(ticker !== null && country === null && category === null){
      url = '/peers/' + ticker.replace(' ','%20');
    }
    if (ticker === null && country !== null && category === null){              
        url = '/peers/country/' + country.replace(' ','%20');    
    }
    if(ticker === null && country !== null && category !== null){
        url = '/peers/country/' + country.replace(' ','%20') + '/' + category.replace(' ','%20');
    } 
    
    // console.log(url)
    Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    return func.makeTheRequest(Data)
    // return fetch(Data)
    // .then(func.handleErrors)   
    // .then(function(response) {    
    //     return response.json();      
    // }).catch(function (err) {
    //     return err.message;
    // });
  } catch (error) {
    throw error
  }
 
}

module.exports.getPeers = getPeers;


