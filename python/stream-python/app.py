import websocket
#import thread
import time
import sys
import json
from pprint import pprint
from time import sleep
import datetime as dt
import threading
import re
import itertools
import urllib

PY3 = sys.version_info[0] == 3

if PY3: # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else: # Python 2.X
    from urllib import urlopen
    from urllib import quote

#subscribe to 'calendar' or symbol e.g.: 'EURUSD:CUR'
if len(sys.argv) == 4:
    event = sys.argv[1]
    client_key = sys.argv[2]  
    client_secret = sys.argv[3]
elif len(sys.argv) == 2:
    event = sys.argv[1]   
    client_key = 'guest' 
    client_secret = 'guest' 
    
    print ('You are subscribed as a guest user')
else:
    print ('Please provide the name of the event that you want to subscribe')
    sys.exit(1) 
    

te_url =  "ws://stream.tradingeconomics.com/"


reconnect_timeout = 60


def on_message(ws, message):
    print ("\n Msg from server:")
    print (message, str(dt.datetime.utcnow()))
    data = json.loads(message)

   #if "topic" in data and data["topic"] != "keepalive":
   #    print "Save data to DB"
    
def on_error(ws, error):
    print (error)

def on_close(ws):
    print ("### closed ### reconnect in " + str(reconnect_timeout) + " seconds")
    sleep(reconnect_timeout)
    start_socket()


def on_open(ws):
    print ("+++ Socket is open!")
    print ("+++ Subscribe to {0}".format(event))
    ws.send(json.dumps({'topic': 'subscribe', 'to': event}) )



def build_url():
    return te_url + "?client=" + client_key + ":" + client_secret


def start_socket():    
    def _on_message(web_sock, message):
        """ 
            made so we do not have to reinitialize connection
        """
        t = threading.Thread(target=on_message, args=(web_sock, message))
        t.start()
    
    ws = websocket.WebSocketApp(build_url(),
                              on_message = _on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
    ws.close()



if __name__ == "__main__":
    websocket.enableTrace(True)
    start_socket()
