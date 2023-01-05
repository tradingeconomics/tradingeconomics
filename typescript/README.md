# TradingEconomics - Market Data Stream

Trading Economics provides its users with real time quotes, delayed feeds and historical data for currencies, commodities, stock indexes, share prices and bond yields. 


## Installation

```bash
yarn add tradingeconomics-stream
```

## Usage

Create an app.ts file with the contents:


```typescript
import { TEClient} from 'tradingeconomics-stream'

const subscribe = (asset: string) => {
  const client = new TEClient({
    key: 'your-key',
    secret: 'your-secret',
  })

  client.subscribe(asset)

  client.on('message', msg => {
    console.log(`Got price for asset ${asset}:`, msg.price)
  })
}

subscribe('UKX:IND')
```


## Running it

npx ts-node app.ts



## Author

Jonas Hals

https://github.com/boxhock/tradingeconomics-nodejs-stream
