'use strict'


global.url_base = 'https://api.tradingeconomics.com';
   
function login(apikey){

    global.apikey = apikey;

    if (apikey == null){
        apikey = 'guest:guest';
    }else{
        apikey = apikey;
    }
    
    return console.log("you are logged in as "+apikey);
     
}


module.exports.login = login;



