import { TEClient} from 'tradingeconomics-stream'

// Credentials
let key = 'guest'
let secret = 'guest'

if (process.env.apikey){
  const apikey = process.env.apikey
  if (apikey.includes(':')) {
    key = apikey.split(':')[0]
    secret = apikey.split(':')[1]
  }
}

console.log("Credentials:", key)


// Subscribing to Quotes

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
