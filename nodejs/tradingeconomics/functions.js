'use strict'
const fetch = require('node-fetch');

var checkDates = function(start_date, end_date){

    var start_date;
    var end_date;

    if(start_date > end_date){
        console.error("Start date cannot be bigger than end date!");
    }
    return;
  }

function checkTime (time){
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
    return isValid
}

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
function resetGlobalVariables() {

  try {
    
    global.country = null;
    global.indicator = null;
    global.ticker = null;
    global.group = null;
    global.category = null;
    global.category_group = null;
    global.components_symbol = null;
    global.counties = null;
    global.country1 = null;
    global.country2 = null;
    global.county = null;
    global.cross = null;
    global.end_date = null;
    global.group = null;
    global.historical = null;
    global.historical_symbol = null;
    global.id = null;
    global.importance = null;
    global.indicator = null;
    global.isin = null;
    global.limit = null;
    global.lists = null;
    global.marketsField = null;
    global.peers_symbol = null;
    global.search_term = null;
    global.series_code = null;
    global.start = null;
    global.start_date = null;
    global.state = null;
    global.symbol = null;
    global.term = null;
    global.ticker = null;
    global.time = null;
    global.type = null;
    global.utc = null;
    
  } catch (error) {
    throw error
  }
}

function makeTheRequest(Data) {
  return fetch(Data)
    .then(handleErrors)
    .then(resetGlobalVariables())   
    .then(function(response) {
        return response.json(); // process it inside the `then` when calling the function       
    }).catch(function (err) {
        throw err;
    });
}

module.exports.handleErrors = handleErrors;
module.exports.checkDates = checkDates;
module.exports.checkTime = checkTime;
module.exports.makeTheRequest = makeTheRequest;