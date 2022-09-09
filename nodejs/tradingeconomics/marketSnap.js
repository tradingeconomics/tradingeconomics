'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');


//setting global variables to be used outside this module
global.country = null;
global.symbol = null;
global.marketsField = null;
global.peers_symbol = null;
global.components_symbol = null;
global.search_term = null;
global.category = null;
global.cross = null;


//This function builds the path to get the API request:
/******************************************************************************************************
   parameters:
    country, symbol, peers_symbol, components_symbol, search_term, category, marketsField
    -> MarketsField can be:
        commodities, index, currency, bond and crypto
    -> Search_term: search by country
        By Default, the search will look into the categories:Indexes, markets, bonds, and commodities.

   example:
    getMarketSnap(marketsField ='index');
    getMarketSnap(symbol = 'aapl:us' );        
    getMarketSnap(symbol = ['aapl:us', 'indu:ind']);        
    getMarketSnap(peers_symbol ='aapl:us' );        
    getMarketSnap(components_symbol ='psi20:ind');        
    getMarketSnap(country ='japan');
    getMarketSnap(cross ='eur');          
    getMarketSnap(country ='united states');        
    getMarketSnap(search_term ='japan', category = 'index, markets');        
    getMarketSnap(search_term ='japan', category = 'index, markets');        

*******************************************************************************************************/

function getMarketSnap(){

    try {
        var Data = '';
        var url = '';
       
        if (marketsField === 'commodities'){    
            url = '/markets/commodities';    
        }
        if (marketsField === 'currency'){      
            url = '/markets/currency';    
        }
        if (marketsField === 'index'){     
            url = '/markets/index';    
        }  
        if (marketsField === 'bond'){     
            url = '/markets/bond';
        }
        if (marketsField === 'crypto'){     
            url = '/markets/crypto';
        }
        if(symbol != null){
            url = '/markets/symbol/' + symbol;
        }
        if(cross != null){
            url = '/markets/currency/' + '?c=' + apikey + '&cross=' + cross;
        }
        if (peers_symbol != null){
            url = '/markets/peers/' + peers_symbol;
        }
        if(components_symbol != null){
            url = '/markets/components/' + components_symbol;
        }
        if(country != null){
            url = '/markets/country/' + country;
        }
    
        if(search_term != null){
            url = '/markets/search/' + search_term;   
        }
        if(category != null){
            url = '/markets/search/' + search_term + '?c=' + apikey + '&category=' + category ;
        }
            
        if (url.includes(category || cross)){
            Data = url_base + url .replace (' ','%20');
        }else{
            Data = url_base + url + '?c=' + apikey.replace (' ','%20');
        }
        return func.makeTheRequest(Data)
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

module.exports.getMarketSnap = getMarketSnap;


  









