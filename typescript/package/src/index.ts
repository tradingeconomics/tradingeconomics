import WebSocket from 'ws'
import * as events from 'events'

export type Options = {
  url: string
  key: string
  secret: string
  reconnect: boolean
  reconnect_timeout: number
}

const defaultOptions = {
  url: 'ws://stream.tradingeconomics.com/',
  key: 'guest',
  secret: 'guest',
  reconnect: true, // reconnect on disconnect
  reconnect_timeout: 3000, // time (in milliseconds) to wait before attempt to reconnect
}

export class TEClient extends events.EventEmitter {
  private readonly options: Options
  private ws: WebSocket
  private subArr: string[] = []
  private reconnecting = false

  constructor(options?: Partial<Options>) {
    super()
    this.options = { ...defaultOptions, ...options }
    this.ws = new WebSocket(buildWsUrl(this.options))
    this.handleConnection()
  }

  private reconnect = () => {
    if (!this.options.reconnect || this.reconnecting) return
    this.reconnecting = true

    console.debug('Trying to reconnect in', this.options.reconnect_timeout)
    setTimeout(() => {
      this.reconnecting = false
      this.ws = new WebSocket(buildWsUrl(this.options))
      this.handleConnection()
    }, this.options.reconnect_timeout)
  }

  private handleConnection = () => {
    console.debug('Connecting to WS endpoint', this.options.url)

    let connected = false
    this.ws.on('open', () => {
      connected = true
      console.debug('WS connected')
      this.subArr.forEach((subject) => {
        this.ws.send(`{"topic": "subscribe", "to": "${subject}"}`)
      })
    })

    this.ws.on('message', (data) => {
      try {
        const aux = JSON.parse(data as string)
        if (aux.topic && aux.topic !== 'keepalive') {
          this.emit('message', aux)
        }
      } catch (err) {
        console.error(err)
      }
    })

    this.ws.on('close', () => {
      if (!connected) return

      console.debug('WS connection closed')
      this.reconnect()
    })

    this.ws.on('error', (err) => {
      console.error(err)
      this.reconnect()
    })
  }

  subscribe = (to: string): void => {
    if (this.subArr.indexOf(to) < 0) {
      this.subArr.push(to)
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    this.ws.send(`{"topic": "subscribe", "to": "${to}"}`)
  }
}

const buildWsUrl = (options: Options): string => {
  return options.url + '?client=' + options.key + ':' + options.secret
}
