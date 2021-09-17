'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.id = null;
global.start_date = null;
global.end_date = null;
global.utc = null;
global.importance = null;

//This function builds the path to get the API request:
/***************************************************************************************************************  
     WITHOUT PARAMETERS A LIST OF ALL EVENTS WILL BE PROVIDED 
    parameters:
        String or list: country, indicator, ticker, id, importance 
        Date: start_date, end_date
        UTC: choose utc time zone

    example:
        getCalendar();
        getCalendar(importance='1');
        getCalendar(utc='-60');
        getCalendar(start_date = '2016-02-01', end_date = '2016-02-10');
        getCalendar(start_date = '2016-02-01', end_date = '2016-02-10', utc='180');
        getCalendar(country = ['china', 'portugal']);
        getCalendar(country = ['china', 'portugal'], utc='120');
        getCalendar(country ='china', start_date = '2016-02-01', end_date = '2016-02-10');
        getCalendar(indicator = 'interest rate' ); 
        getCalendar(indicator ='inflation rate', start_date = '2016-02-01', end_date = '2016-02-10');       
        getCalendar(ticker = ['SPAINFACORD', 'BAHRAININFNRATE']); 
        getCalendar(ticker =['SPAINFACORD', 'BAHRAININFNRATE'], start_date = '2018-01-01', end_date = '2018-03-01'); 
        getCalendar(id =['174108','160025','160030']);     

****************************************************************************************************************/

function getCalendar(){

    var Data = '';
    var url = '';

    if (country != null){    
        url = '/calendar/country/' + country;    
    }
    if (country != null && start_date != null && end_date != null){    
        url = '/calendar/country/' + country + '/' + start_date + '/' + end_date;    
    }
    if (indicator != null){      
        url = '/calendar/indicator/' + indicator.toLowerCase();    
    }
    if (indicator != null && start_date != null && end_date != null){      
        url = '/calendar/indicator/' + indicator + '/' + start_date + '/' + end_date;    
    }
    if (start_date != null && end_date != null && country === null && indicator === null && ticker === null && id === null){      
        url = '/calendar/country/All/' + start_date + '/' + end_date;    
    }
    if (country!= null && indicator != null){    
        url = '/calendar/country/' + country + '/indicator/' + indicator.toLowerCase();    
    }
    if (country != null && indicator != null && start_date != null && end_date != null){    
        url = '/calendar/country/' + country + '/indicator/' + indicator.toLowerCase() + '/' + start_date + '/' + end_date;    
    }
    if (ticker != null){     
        url = '/calendar/ticker/' + ticker;    
    }
    if (ticker != null && start_date != null && end_date != null){     
        url = '/calendar/ticker/' + ticker + '/' + start_date + '/' + end_date;    
    }
    if(id != null){
        url = '/calendar/calendarid/' + id;
    }  
    if(country === null && indicator === null && start_date === null && end_date === null && ticker === null && id === null){
        url = '/calendar';
    }
  
    date.checkDates(start_date, end_date); 
    if(utc && !importance){
        Data = url_base + url + '?c=' + apikey.replace (' ','%20') + '&UTC=' + utc;
    }else if(importance && !utc){
        importance = importance.toString();
        Data = url_base + url + '?c=' + apikey.replace (' ','%20') + '&importance=' + importance;
    }
    else{
        Data = url_base + url + '?c=' + apikey.replace (' ','%20');
    }
   //console.log(Data);

    return fetch(Data)
    .then(func.handleErrors)   
    .then(function(response) {      
        return response.json(); // process it inside the `then` when calling the function
             
    }).catch(function (err) {
        return err.message;
    });
   
} 

module.exports.getCalendar = getCalendar;











