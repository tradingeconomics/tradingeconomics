"use strict";
exports.__esModule = true;
var tradingeconomics_stream_1 = require("tradingeconomics-stream");
var key = process.env.key;
var secret = process.env.secret;
console.log("Using credentials", key, secret);
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
