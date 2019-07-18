import tradingeconomics as te
import json

te.login('guest:guest')

te.subscribe('calendar')


def on_message(ws, message):
    data = json.loads(message)
    print (data)



te.run(on_message)