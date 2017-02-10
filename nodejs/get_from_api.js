var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/country',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // parse results !
});
}
  
var req = http.get(options, callback).end();