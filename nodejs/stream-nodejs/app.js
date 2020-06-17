'use strict'


var te_client = require('./te_client'),
	Client = new te_client({
		url: 'ws://stream.tradingeconomics.com/',
		key: 'yu06vzmlllju1qz', //API_CLIENT_KEY
		secret: 'mtvmbg847pwz3jn' //API_CLIENT_SECRET
		//reconnect: true
	});
	

	
Client.subscribe('nky:ind');


Client.on('message', function(msg){
	console.log('\n Data from TradingEconomics stream: ', msg.topic);
	console.log(msg);

	//parse/save msg to DB
});

//...


