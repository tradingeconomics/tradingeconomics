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
