"use strict";
exports.__esModule = true;
var tradingeconomics_stream_1 = require("tradingeconomics-stream");
var key = 'guest';
var secret = 'guest';
if (process.env.apikey) {
    var apikey = process.env.apikey;
    if (apikey.includes(':')) {
        key = apikey.split(':')[0];
        secret = apikey.split(':')[1];
    }
}
console.log("Credentials:", key);
var subscribe = function (asset) {
    var client = new tradingeconomics_stream_1.TEClient({
        key: key,
        secret: secret
    });
    client.subscribe(asset);
    client.on('message', function (msg) {
        console.log("Got price for asset ".concat(asset, ":"), msg.price);
    });
};
subscribe('EURUSD:CUR');
