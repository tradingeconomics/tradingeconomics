import tradingeconomics as te
import json

te.login('yu06vzmlllju1qz:mtvmbg847pwz3jn')

def on_message(ws, message):
  print( json.loads(message))

te.subscribe('EURUSD:CUR')
te.run(on_message)