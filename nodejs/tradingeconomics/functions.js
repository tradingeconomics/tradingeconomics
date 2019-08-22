'use strict'

var checkDates = function(start_date, end_date){

    var start_date;
    var end_date;

    if(start_date > end_date){
        console.error("Start date cannot be bigger than end date!");
    }
    return;
  }

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}  

module.exports.handleErrors = handleErrors;

module.exports.checkDates = checkDates;