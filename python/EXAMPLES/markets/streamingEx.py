import tradingeconomics as te
import json

te.login('guest:guest')

def on_message(ws, message):
  print json.loads(message)

#to get multiple symbols
te.subscribe(['EURUSD:CUR', 'USDRUB:CUR', 'CL1:COM', 'AAPL:US'])

#to get just one symbol
te.subscribe('EURUSD:CUR')

te.run(on_message)



