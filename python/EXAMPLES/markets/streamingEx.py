import tradingeconomics as te
import json

te.login('guest:guest')

def on_message(ws, message):
  print json.loads(message)

te.subscribe(['EURUSD:CUR', 'USDRUB:CUR', 'CL1:COM'])
te.run(on_message)


