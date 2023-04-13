'use strict'

const func = require('./functions.js');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.id = null;
global.start_date = null;
global.end_date = null;
global.utc = null;
global.importance = null;
global.group = null;

/***************************************************************************************************************  
    ### Without parameters a list of all events will be provided
    ##### parameters:  
        String or list: country, indicator, ticker, id, importance  
        Date: start_date, end_date  
        UTC: choose utc time zone  

    ##### example:
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

    try {
        var Data = '';
        var url = '';
    
        if (country != null) url = `/calendar/country/${country}`;
        
        if (country != null && start_date != null && end_date != null) url = `/calendar/country/${country}/${start_date}/${end_date}`; 

        if (indicator != null) url = `/calendar/indicator/${indicator.toLowerCase()}`;

        if (indicator != null && start_date != null && end_date != null) url = `/calendar/indicator/${indicator}/${start_date}/${end_date}`;

        if (start_date != null && end_date != null && country === null && indicator === null && ticker === null && id === null) url = `/calendar/country/All/${start_date}/${end_date}`;
        
        if (country!= null && indicator != null) url = `/calendar/country/${country}/indicator/${indicator.toLowerCase()}`;    
        
        if (country != null && indicator != null && start_date != null && end_date != null) url = `/calendar/country/${country}/indicator/${indicator.toLowerCase()}/${start_date}/${end_date}`;    
        
        if (ticker != null) url = `/calendar/ticker/${ticker}`;

        if (ticker != null && start_date != null && end_date != null) url = `/calendar/ticker/${ticker}/${start_date}/${end_date}`;    

        if(id != null) url = `/calendar/calendarid/${id}`;

        if(country === null && indicator === null && start_date === null && end_date === null && ticker === null && id === null) url = '/calendar';
      
        func.checkDates(start_date, end_date);

        if(utc && !importance) Data = `${url_base}${url}?c=${apikey.replace(' ','%20')}&UTC=${utc}`;
        else if(importance && !utc){
            importance = importance.toString();
            Data = `${url_base}${url}?c=${apikey.replace(' ','%20')}&importance=${importance}`;
        }
        else Data = `${url_base}${url}?c=${apikey.replace(' ','%20')}`;

        return func.makeTheRequest(Data)
    } catch (error) {
       throw error 
    }
}


/***************************************************************************************************************  
    ### Get calendar events by group and country. Group parameter is mandatory.
    ##### parameters:  
        String or list: group, country
        Date: start_date, end_date   

    ##### example:
        getCalendarEventsByGroup(group='interest rate');
        getCalendarEventsByGroup(group='inflation', country='china', end_date='2023-12-01', start_date='2023-01-01')

****************************************************************************************************************/
function getCalendarEventsByGroup(){

    try {
        var Data = '';
        var url = '/calendar';
    
        if (country != null) url += `/country/${country}`; 

        if (group != null && typeof(group) === 'string') url += `/group/${group.toLowerCase()}`;
        else return new Promise((resolve, reject) => reject(`Error! Wrong group argument: ${group}`));

        func.checkDates(start_date, end_date);

        if (start_date != null && end_date != null) url += `/${start_date}/${end_date}`;
        else if (start_date === null || end_date === null) url += `/${[start_date, end_date].filter(Boolean).join()}`;  

        Data = url_base + url + '?c=' + apikey.replace(' ','%20');
        return func.makeTheRequest(Data)
    } catch (error) {
       throw error 
    }
}

module.exports.getCalendar = getCalendar;
module.exports.getCalendarEventsByGroup = getCalendarEventsByGroup;