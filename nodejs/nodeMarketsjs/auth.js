

//setting headers for authorization - key:secret
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'Client guest:guest'    
  };
  
  var buffer = '';//setting variable to store response 
  
  //setting options to compose the URL path 
  var getMarketCommodity = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/commodities'.replace(' ', '%20'),//replace white spaces
    headers: headers 
  };
  var getMarketCurrency = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/currency'.replace(' ', '%20'),//replace white spaces
    headers: headers  
  };
  var getMarketIndex = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/index'.replace(' ', '%20'),//replace white spaces
    headers: headers 
  };
  var getMarketBond = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/bond'.replace(' ', '%20'),//replace white spaces
    headers: headers   
  };
  var getMarketSymbol = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/symbol/aapl:us'.replace(' ', '%20'),//replace white spaces
    headers: headers   
  };
  var getMarketComponent = {
    host: 'api.tradingeconomics.com',
    port: 443,
    path:  '/markets/components/psi20:ind'.replace(' ', '%20'),//replace white spaces
    headers: headers   
  };

  //expoting variables to use in 'markets.js' file
  module.exports.getMarketCommodity = getMarketCommodity;
  module.exports.getMarketCurrency = getMarketCurrency;
  module.exports.getMarketIndex = getMarketIndex;
  module.exports.getMarketBond = getMarketBond;
  module.exports.getMarketSymbol = getMarketSymbol;
  module.exports.getMarketComponent = getMarketComponent;
  
  
  
  
  
  
  
  