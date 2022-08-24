import websocket
import ssl

import json
from pprint import pprint
from time import sleep
import datetime as dt
import threading
from . import glob

  

te_url = "wss://stream.tradingeconomics.com"


reconnect_timeout = 60
function_to_restart = ["", ""]


def on_error(ws, error):
    print(error)

def on_open(ws):
    print("+++ Socket is open!")
    for ev in glob._event:
        print("+++ Subscribe to {0}".format(ev))
        ws.send(json.dumps({'topic': 'subscribe', 'to': ev}) )

def build_url():
    return te_url + "?client=" + glob.apikey + "&app=python&token=20171116"

def start_socket(on_message_client, *args):  
    def _on_message(web_sock, message):
        """ 
            made so we do not have to reinitialize connection
        """
        t = threading.Thread(target=on_message_client, args=(web_sock, message))
        t.start()
       
      
    def _on_close(web_sock):
        if (function_to_restart[1]) :
            t = threading.Thread(target=function_to_restart[1], args=(web_sock, json.dumps({"msg" : "CLOSING"})))
            t.start()
        print("### closed ### reconnect in " + str(reconnect_timeout) + " seconds")
        sleep(reconnect_timeout)
        start_socket(function_to_restart[0]) 

    
    ws = websocket.WebSocketApp(build_url(),
                              on_message = _on_message,
                              on_error = on_error,
                              on_close = _on_close)
    
    ws.on_open = on_open
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})
    ws.close()
    

def run(on_message_client, *args): ##passing on args ('on_close_client')

    websocket.enableTrace(True)
    function_to_restart[0] = on_message_client
    
    if (args):
        function_to_restart[1] = args[0]
        start_socket(function_to_restart[0], function_to_restart[1])
    else:
        start_socket(function_to_restart[0])
    

	