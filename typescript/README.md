# Trading Economics - Typescript - Market Data Stream

Trading Economics provides its users with economic indicators and quotes, delayed feeds and historical data for currencies, commodities, stock indexes, share prices and bond yields. 

#
## Example

Create an app.ts file with the contents:


```typescript
import { TEClient} from 'tradingeconomics-stream'

const key = process.env.key;
const secret = process.env.secret;
console.log("Using credentials", key, secret)

const subscribe = (asset: string) => {
  const client = new TEClient({
    key: key,
    secret: secret,
  })

  client.subscribe(asset)

  client.on('message', msg => {
    console.log(`Got price for asset ${asset}:`, msg.price)
  })
}

subscribe('EURUSD:CUR')
```

#
**Install Packages**

```bash
npm install 'tradingeconomics-stream'
npm install -g typescript
npm i --save-dev @types/node
```


#
**Compile Typescript**

```bash
tsc app.ts
```

**Run the app**

```bash
export key=guest
export secret=guest 
node app.js
```
#

##

**More examples in Javascript**


https://github.com/tradingeconomics/tradingeconomics/tree/master/nodejs

##

#

**Acknowledgements** 


Jonas Hals


https://github.com/boxhock/tradingeconomics-nodejs-stream



