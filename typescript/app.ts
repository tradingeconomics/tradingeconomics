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
