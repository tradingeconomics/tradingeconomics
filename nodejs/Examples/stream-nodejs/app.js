// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#streaming

'use strict'

var te_client = require('./te_client'),
  Client = new te_client({
    url: 'wss://stream.tradingeconomics.com/',
    key: 'guest', //API_CLIENT_KEY
    secret: 'guest', //API_CLIENT_SECRET
    //reconnect: true
  })

/*
Examples for multiple symbols:
	1. 'INDU:IND, AAPL:US'
	2. ['INDU:IND', 'DAX:IND']
*/
Client.subscribe('EURUSD:CUR')
//For Economic calendar events: Client.subscribe('calendar')
//For News: Client.subscribe('news')

Client.on('message', function (msg) {
  console.log('\n Data from TradingEconomics stream: ', msg.topic)
  console.log(msg)

  //parse/save msg to DB
})

//...
