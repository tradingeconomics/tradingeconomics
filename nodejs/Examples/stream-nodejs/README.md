## To run:

Step 1 - Clone Repository.
```
git clone https://github.com/tradingeconomics/tradingeconomics
```

Step 2
```
cd tradingeconomics/nodejs/Examples/stream-nodejs
```

Step 3 - Install dependencies
```
npm install
```


Step 4 - In app.js file, set-up your client key/secret
```
Client = new te_client({
		url: 'wss://stream.tradingeconomics.com/',
		key: 'API_CLIENT_KEY', // <--
		secret: 'API_CLIENT_SECRET' // <--
		//reconnect: true
	});
```

NOTE: When subscribing to multiple symbols, you can pass it as String or an Array. Examples:
	
	1. String - ('EURUSD:CUR, DAX:IND') 
	2. Array -  ['EURUSD:CUR', 'DAX:IND']

Step 5 - Run it!
```
node app.js
```


