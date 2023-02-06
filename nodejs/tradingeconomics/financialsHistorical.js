'use strict'

const func = require('./functions.js');
const date = require('./functions.js');

//setting global variables to be used outside this module
global.symbol = null;
global.category = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/***********************************************************************************  
   parameters:
    String: symbol
    String: category

   example:
    getFinancialsHistorical(symbol = 'aapl:us', category = 'assets');
             

***********************************************************************************/

function getFinancialsHistorical(){

    try {
        var Data = '';
        var url = '';
    
        
        if (symbol != null && category != null){

            const symbols_array = typeof(symbol) === 'object' ? symbol : [symbol];
            const category_array  = typeof(category) === 'object' ? category : [category];

            const symbols_category = symbols_array.flatMap(symbol => category_array.map(category => `${symbol}:${category}`));

            url = `/financials/historical/${symbols_category}`;    
        }
        else return new Promise((resolve, reject) => reject('No arguments supplied.'));

        if (start_date != null && end_date != null) {
            date.checkDates(start_date, end_date);
            Data = `${url_base}${url}?c=${apikey.replace (' ','%20')}&d1=${start_date}&d2=${end_date}`;
        }
        else if (start_date === null && end_date != null) {
            Data = `${url_base}${url}?c=${apikey.replace (' ','%20')}&d2=${end_date}`;
        }
        else Data = `${url_base}${url}?c=${apikey.replace (' ','%20')}`;
        
        return func.makeTheRequest(Data)
    } catch (error) {
        throw error
    }
   
}

module.exports.getFinancialsHistorical = getFinancialsHistorical;









