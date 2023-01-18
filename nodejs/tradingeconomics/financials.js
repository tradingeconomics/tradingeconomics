'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.symbol = null;
global.country = null;
global.category = null;


//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String or list: symbol
    String or list: country

   example:

        getFinancialsData(symbol = 'aapl:us'); 
        getFinancialsData(symbol = ['aapl:us', 'ea:us']);
        getFinancialsData(country = 'china');
        getFinancialsData(country = ['china', 'united states']);

          
***********************************************************************************/
function getFinancialsData(){
    try {
        var data_url = '';
    
        // d is a dictionary used for create the api url
        var d = {
            'url_base': 'https://api.tradingeconomics.com/financials',
            'symbol': '',
            'country': '/companies',
            'key': `?c=${apikey}`,
            'output_type' : ''
        }
        
        if (country != null && symbol == null){
            //the 'key' value has to be changed due to url enpoint use of '?' or '&' characters. 
            d.key = `&c=${apikey}`;
            d.country = `/companies?country=${country}`;
        }
        if (symbol != null && country == null) {
            d.country = '';
            d.symbol = `/symbol/${symbol}`;
        }
        data_url = `${d.url_base}${d.symbol}${d.country}${d.key}`.replace (' ', '%20');    
        
        console.log('If both "country" and "symbols" are null or not null at the same time, a full companies list will be provided ')
        return func.makeTheRequest(data_url)
        // return fetch(data_url)
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

/***********************************************************************************  
    Returns a json object with all financial categories.

   example:

        getFinancialsCategoryList(); 
          
***********************************************************************************/
function getFinancialsCategoryList(){
    try {
        var data_url = '';
    
        // d is a dictionary used for create the api url
        var d = {
            'url_base': 'https://api.tradingeconomics.com/financials/categories',
            'key': `?c=${apikey}`,
            'output_type' : ''
        }

 
        data_url = `${d.url_base}${d.key}`.replace (' ', '%20');    
        
        return func.makeTheRequest(data_url)

    } catch (error) {
        throw error
    }
}

/***********************************************************************************  
Returns a json object with financial data of the category parameter passed.   

parameters:
    String: category

   example:

        getFinancialsDataByCategory(category = 'debt'); 
        getFinancialsData(symbol = [category, 'assets']);

          
***********************************************************************************/
function getFinancialsDataByCategory(){
    try {
        var data_url = '';
    
        // d is a dictionary used for create the api url
        var d = {
            'url_base': 'https://api.tradingeconomics.com/financials/category',
            'category': '',
            'key': `?c=${apikey}`,
            'output_type' : ''
        }
        
        if (category != null){
            //the 'key' value has to be changed due to url enpoint use of '?' or '&' characters. 
            d.category = `/${category}`;
        }
        else{
            return 'No category supplied'
        }

        data_url = `${d.url_base}${d.category}${d.key}`.replace (' ', '%20');
        console.log(data_url);
        
        return func.makeTheRequest(data_url)

    } catch (error) {
        throw error
    }
   
}

module.exports.getFinancialsData = getFinancialsData;
module.exports.getFinancialsCategoryList = getFinancialsCategoryList;
module.exports.getFinancialsDataByCategory = getFinancialsDataByCategory;