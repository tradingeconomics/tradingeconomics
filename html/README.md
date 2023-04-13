# Trading Economics - HTML - Market Data Stream

Trading Economics provides its users with real time quotes, delayed feeds and historical data for currencies, commodities, stock indexes, share prices and bond yields. 

#

## Usage

* The HTML file has by default the demo key, it has some restrictions on the symbol that you can get.
* If you already have a client key replace the key and secret variables.
* Then change the topic for the one desired

```bash
ws.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');
```

* **Note:** If you don't have a client key, you can get your free key here: http://developer.tradingeconomics.com 

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx


