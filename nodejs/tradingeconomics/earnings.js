'use strict'

const auth = require('./auth.js');
const date = require('./functions.js');
const func = require('./functions.js');
const fetch = require('node-fetch');
const https = require('https');



// function getEarnings(){

//     try {
//         var Data = '';
//         var url = '';
          
//         if (symbol != null){                   
//             url =  '/earnings/symbol/' + symbol + '?d1=' + start_date;      
//         }
//         if(country != null){
//             url = '/earnings/country/' + country;
//         }
//         if (start_date != null && end_date != null){                 
//             url = '/earnings?d1=' + start_date + '&d2=' + end_date;      
//         }
//         else if (start_date != null && end_date === null){
//             url = '/earnings?d1=' + start_date;   
//         }
//         else if (start_date === null && end_date != null){
//             url = '/earnings?d2=' + end_date;
//         }

//         if(country === null && symbol === null && start_date === null && end_date === null){
//             url =  '/earnings';
//         }
//         if(type != null){
//             url = '/earnings' + '?type=' + type;
//         }
       
//         date.checkDates(start_date, end_date); 
       
//         if(url.includes('?')){
//             Data = url_base + url + '&c='+ apikey.replace (' ','%20');
//         }else{
//             Data = url_base + url + '?c='+ apikey.replace (' ','%20');
//         }
//         console.log(Data);
//         return func.makeTheRequest(Data)
//         // return fetch(Data)
//         // .then(func.handleErrors)   
//         // .then(function(response) {    
//         //     return response.json(); // process it inside the `then` when calling the function       
//         // }).catch(function (err) {
//         //     return err.message;
//         // });
//     } catch (error) {
//         throw error
//     }
   
// }
class DateError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DateError';
    }
  }

function isValid(date_text) {
    try {
      try {
        new Date(date_text + 'T00:00:00Z');
      } catch {
        new Date(date_text);
      }
    } catch {
      throw new DateError("Incorrect data format, should be YYYY-MM-DD");
    }
  }
  

function checkEarningsDates(baseLink, start_date = null, end_date = null) {
    if (start_date !== null && end_date === null) {
      try {
        if (isValid(start_date)) {
          throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
        }
        // if (start_date > dayjs().format('YYYY-MM-DD')) {
        //   throw new DateError('Initial date out of range.');
        // }
        baseLink += '&d1=' + encodeURIComponent(start_date);
      } catch (err) {
        throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
      }
    }
  
    if (start_date !== null && end_date !== null) {
      try {
        if (isValid(start_date)) {
          throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
        }
        if (isValid(end_date)) {
          throw new DateError('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY.');
        }
        const startDateObj = new Date(start_date)// isValid(start_date);
        const endDateObj = new Date(end_date);
        if (startDateObj > endDateObj) {
            throw new DateError('Start date must be earlier than end date.');
        }

        // if (dayjs(end_date).diff(start_date, 'days') < 0) {
        //   throw new DateError('Invalid time period.');
        // }
        baseLink += '&d1=' + encodeURIComponent(start_date) + '&d2=' + encodeURIComponent(end_date);
      } catch (err) {
        throw new DateError(err.message);
      }
    }
  
    if (start_date === null && end_date !== null) {
      throw new DateError('initDate value is missing');
    }
    
    return baseLink;
  }

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
            } catch (error) {
              if (data == "You must provide valid credentials. Please contact support@tradingeconomics.com"){
                resolve(data);
              }
            reject(error);
            }
        });
        }).on('error', (error) => reject(error));
    });
}

//setting global variables to be used outside this module
global.symbol = null;
global.country = null;
global.type = null;
global.start_date = null;
global.end_date = null;
global.index = null;
global.index = null;
  

/******************************************************************************************* 
  parameters:
    String or list: symbol, country, index, sector
    String: type, start_date, end_date
        -> type can be:
           earnings, ipo, dividends

  example:
    getEarnings();
    getEarnings(start_date = '2018-02-02');
    getEarnings(country = 'united states');
    getEarnings(symbol ='CMCSA:US', start_date = '2018-02-02');
    getEarnings(symbol ='FARM:US', start_date = '2018-02-01', end_date = '2018-03-01');         
         
*********************************************************************************************/
function getEarnings(){
    try {

        let linkAPI = 'https://api.tradingeconomics.com/earnings-revenues';

        if (symbol) {
          linkAPI += '/symbol/';
          if (typeof symbol !== 'string') {
            linkAPI += encodeURIComponent(symbol.join(','));
          } else {
            linkAPI += encodeURIComponent(symbol);
          }
        } 
        else if (country) {
          linkAPI += '/country/';
          if (typeof country !== 'string') {
            linkAPI += encodeURIComponent(country.join(','));
          } else {
            linkAPI += encodeURIComponent(country);
          }
        }
        else if (index) {
          linkAPI += '/index/';
          if (typeof index !== 'string') {
            linkAPI += encodeURIComponent(index.join(','));
          } else {
            linkAPI += encodeURIComponent(index);
          }
        }
        else if (sector){
          linkAPI += '/sector/';
          if (typeof sector !== 'string') {
            linkAPI += encodeURIComponent(sector.join(','));
          } else {
            linkAPI += encodeURIComponent(sector);
          }
        }
          

        // var Data = '';
        // var url = '';
          
        // if (symbol != null){                   
        //     url =  '/earnings/symbol/' + symbol + '?d1=' + start_date;      
        // }
        // if(country != null){
        //     url = '/earnings/country/' + country;
        // }
        // if (start_date != null && end_date != null){                 
        //     url = '/earnings?d1=' + start_date + '&d2=' + end_date;      
        // }
        // else if (start_date != null && end_date === null){
        //     url = '/earnings?d1=' + start_date;   
        // }
        // else if (start_date === null && end_date != null){
        //     url = '/earnings?d2=' + end_date;
        // }

        // if(country === null && symbol === null && start_date === null && end_date === null){
        //     url =  '/earnings';
        // }
        // if(type != null){
        //     url = '/earnings' + '?type=' + type;
        // }
       
        
        try {
            linkAPI += '?c=' + apikey;
            linkAPI = checkEarningsDates(linkAPI, start_date, end_date); 
          } catch (err) {
            if (err instanceof TypeError) {
              throw new LoginError('You need to do login before making any request');
            } else {
              throw err;
            }
          }

        return makeRequest(linkAPI)
        // return func.makeTheRequest(linkAPI)
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

module.exports.getEarnings = getEarnings;
