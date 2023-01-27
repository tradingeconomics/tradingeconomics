"use strict";

global.url_base = "https://api.tradingeconomics.com";
global.apikey;

function login(apikey = null) {
  if (apikey == null) {
    if (process.env.APIKEY) {
      apikey = process.env.APIKEY;
    } else {
      apikey = "guest:guest";
    }
  }

  if(apikey != "guest:guest" && apikey.indexOf(":") < 0){
    return console.log("Invalid credentials.")
  }
  
  global.apikey = apikey;
  return console.log("you are logged in as " + apikey);
}

module.exports.login = login;
