'use strict'


global.url_base = 'https://api.tradingeconomics.com';
global.apikey;
   
function login(apikey = 'guest:guest'){

    global.apikey = apikey;

    if (apikey == null){
        apikey = 'guest:guest';
    }else{
        apikey = apikey;
    }

    return console.log("you are logged in as " + apikey);
    
}


module.exports.login = login;



