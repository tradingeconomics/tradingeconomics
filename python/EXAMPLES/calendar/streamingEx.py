import tradingeconomics as te
import json

te.login('yu06vzmlllju1qz:mtvmbg847pwz3jn')

te.subscribe('calendar')


def on_message(ws, message):
    data = json.loads(message)
    print (data)



te.run(on_message)