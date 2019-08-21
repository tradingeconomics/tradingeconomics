

var checkDates = function(start_date, end_date){

    var start_date;
    var end_date;

    if(start_date > end_date){
        console.error("Start date cannot be bigger than end date!");
    }
    return;
  }


module.exports.checkDates = checkDates;