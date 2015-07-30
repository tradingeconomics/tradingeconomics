'use strict'


var te_client = require('./te_client'),
	Client = new te_client({
		url: 'ws://stream.tradingeconomics.com/',
		key: '', //API_CLIENT_KEY
		secret: '' //API_CLIENT_SECRET
		//reconnect: true
	});



Client.subscribe('calendar'); //recive stream data for calendar events


Client.on('message', function(msg){
	console.log('\n Data from TradingEconomics stream: ', msg.act);
	console.log(msg);

	//parse/save msg to DB
});

//...


