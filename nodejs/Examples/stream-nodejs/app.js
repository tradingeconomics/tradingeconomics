// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#streaming


let myKey = require('./userKey')

let keySecretArray = myKey.key.split(':')

let key = keySecretArray[0];
let secret = keySecretArray[1]

'use strict'

var te_client = require('./te_client'),
  Client = new te_client({
    url: 'wss://stream.tradingeconomics.com/',
    key: key, //API_CLIENT_KEY
    secret: secret, //API_CLIENT_SECRET
    
    //reconnect: true
  })

// Client.subscribe('EURUSD:CUR')
Client.subscribe(['CURRENCIES', 'commodities'])

//For Economic calendar events: Client.subscribe('calendar')
//For News: Client.subscribe('news')

Client.on('message', function (msg) {
  console.log('\n Data from TradingEconomics stream: ', msg.topic)
  console.log(msg)

  //parse/save msg to DB
})

//...
