# TradingEconomics stream

Connect to the TradingEconomics WS stream

## Installation

```bash
yarn add tradingeconomics-stream
```

## Usage

Create a app.ts file with the contents:


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



# Author

Jonas Hals

https://github.com/boxhock/tradingeconomics-nodejs-stream
