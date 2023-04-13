"use strict";

global.url_base = "https://api.tradingeconomics.com";
global.apikey;

function login(apikey = null) {
  if (apikey == null) {
    if (process.env.apikey) {
      apikey = process.env.apikey;
    } else {
      apikey = "guest:guest";
    }
  }

  if(apikey != "guest:guest" && apikey.indexOf(":") < 0){
    return console.log("Invalid credentials.")
  }
  
  global.apikey = apikey;
  return console.log("Logged with " + apikey.split(':')[0]);
}

module.exports.login = login;
