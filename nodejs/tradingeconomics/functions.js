'use strict'

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

module.exports.handleErrors = handleErrors;
module.exports.checkDates = checkDates;
module.exports.checkTime = checkTime;