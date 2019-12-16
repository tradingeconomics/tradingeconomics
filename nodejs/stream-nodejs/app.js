'use strict'


var te_client = require('./te_client'),
	Client = new te_client({
		//url: 'ws://18.212.118.141:80/', 
		//url: 'ws://54.159.58.73:80/', 
		url: 'wss://stream.tradingeconomics.com/',
		//url: 'http://stream.tradingeconomics.com/',
		key: 'guest', //API_CLIENT_KEY
		secret: 'guest' //API_CLIENT_SECRET
		//reconnect: true
	});
	

	
Client.subscribe('indu:ind');



Client.on('message', function(msg){
	console.log('\n Data from TradingEconomics stream: ', msg.topic);
	console.log(msg);

	//parse/save msg to DB
});

//...


