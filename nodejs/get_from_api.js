var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'Client guest:guest'//'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/country/united states',
    headers: headers
};
options.path = options.path.replace (' ','%20');
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // parse results !
    //console.log(buffer)
            
    console.log(JSON.parse(buffer));
    
});
}
  
var req = http.get(options, callback).end();