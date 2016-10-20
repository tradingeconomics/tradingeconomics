## To run:

#####1 - Clone Repository.
```
git clone https://github.com/ieconomics/open-api.git
```

#####2
```
cd open-api/stream/nodejs
```

#####3
```
npm install
```


#####4 - In app.js file, set-up your client key/secret
```
Client = new te_client({
		url: 'ws://stream.tradingeconomics.com/',
		key: 'API_CLIENT_KEY', // <--
		secret: 'API_CLIENT_SECRET' // <--
		//reconnect: true
	});
```

#####5 - Run it!
```
node app.js
```


