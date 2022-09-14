import tradingeconomics as te
import json

te.login('guest:guest')


def on_message(ws, message):
    print(json.loads(message))


te.subscribe('calendar')
te.run(on_message)
