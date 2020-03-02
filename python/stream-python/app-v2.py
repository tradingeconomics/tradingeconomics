#!/bin/env python
import websocket
import time
import sys
import json
import pandas as pd
import datetime as dt
from pandas.tseries.offsets import BDay
import traceback
import logging
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



#logging.basicConfig(filename='example.log',level=logging.DEBUG)

def settle_date():
    """ get current settlement date
    """
    ts = pd.to_datetime(time.time(),
                        unit="s",
                        utc=True).tz_convert("America/New_York")
    ts += dt.timedelta(hours=7)
    if ts.dayofweek in [6, 0]:
        ts += BDay(1)
    return pd.Timestamp(ts.date())


TE_URL = "ws://stream.tradingeconomics.com/"


CLIENT_KEY = "guest" #API_CLIENT_KEY
CLIENT_SECRET = "guest" #API_CLIENT_KEY


SETTLE_DATE = settle_date()


def api_key():
    """
       returns useable key to be used in this framework
       import tradingeconomics as te
       te.login(trading_econ.api_key())
       te.getCalendarData(country='Italy',
                          output_type='df')
    """
    return CLIENT_KEY + ":" + CLIENT_SECRET



def on_message(web_sock, message):  # pylint: disable=W0613
    """
        on_message  stamps message and inserts into pymongo
    """
    print( json.loads(message), str(dt.datetime.utcnow()))

    json.loads(message)

    if settle_date() != SETTLE_DATE:
        logging.debug("settle_date != SETTLE_DATE")
        sys.exit(0)


def on_error(web_sock, error):  # pylint: disable=W0613
    """
        prints web socket error
    """
    logging.debug("On Error:")
    logging.debug(error)
    print (error)


def on_close(web_sock):  # pylint: disable=W0613
    """
        on_close reconnect
    """
    msg = "### closed ### reconnect in "
    msg += str(1) + " seconds tz:" + repr(pd.Timestamp.now(tz="utc"))
    print (msg)
    logging.debug("waiting 1 sec on on_close to call start_socket")
    time.sleep(1)
    #start_socket()


def on_open(web_sock):
    """ subscribe to calendar
        needs to sleep to subscribe multiple times
    """
    print ("Open")
    #web_sock.send(json.dumps({'topic': 'subscribe', 'to': 'calendar'}))
    web_sock.send(json.dumps({'topic': 'subscribe', 'to': 'EURUSD:CUR'}) )
    time.sleep(2)


def build_url():
    """ builds web url for streaming
    """
    print ("BUILD")
    return TE_URL + "?client=" + CLIENT_KEY + ":" + CLIENT_SECRET


def start_socket():
    """ starts web_socket that runs forever
    """
    logging.debug("Starting the socket.")
    def _on_message(web_sock, message):
        """ 
            made so we do not have to reinitialize connection
        """
        t = threading.Thread(target=on_message, args=(web_sock, message,))
        t.start()
        #on_message(web_sock, message)
    web_sock = websocket.WebSocketApp( build_url(), on_message=_on_message, on_error=on_error, on_close=on_close)

    web_sock.on_open = on_open
    try:
        print ("RUN")
        web_sock.run_forever()
    #except KeyboardInterrupt:
    except:
        print (traceback.print_exc())
        logging.debug("exception on the run_forever()")
        sys.exit("Error. Exiting...")
    logging.debug("End of start_socket()")
    web_sock.close()


def main():
    """ starts auto reconnecting client.
    """
    print ("STARTING")
    start_socket()

if __name__ == "__main__":
    sys.exit(main())
	
