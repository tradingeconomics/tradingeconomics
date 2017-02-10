import websocket
import thread
import time
import sys
import json
from pprint import pprint
from time import sleep


te_url = "ws://stream.tradingeconomics.com/"
client_key = "guest" #API_CLIENT_KEY
client_secret = "guest" #API_CLIENT_KEY

reconnect_timeout = 60


def on_message(ws, message):
    print "\n Msg from server:"
    print message
    data = json.loads(message)

    if "topic" in data and data["topic"] != "keepalive":
        print "Save data to DB"
    





def on_error(ws, error):
    print error

def on_close(ws):
    print "### closed ### reconnect in " + str(reconnect_timeout) + " seconds"
    sleep(reconnect_timeout)
    start_socket()




#ws.close()

def on_open(ws):
    print "+++ Socket is open!"
    print "+++ Subscribe to calendar events..."
    ws.send(json.dumps({'topic': 'subscribe', 'to': 'calendar'}) )
    print "+++ Subscribe to EURUSD..."
    ws.send(json.dumps({'topic': 'subscribe', 'to': 'EURUSD'}) )





def build_url():
    return te_url + "?client=" + client_key + ":" + client_secret


def start_socket():
    ws = websocket.WebSocketApp(build_url(),
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()




if __name__ == "__main__":
    websocket.enableTrace(True)
    start_socket()
