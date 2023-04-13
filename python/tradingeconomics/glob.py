from . import functions as fn
import os

def login(userkey = None):
    global apikey
    if userkey == None:
        if 'apikey' in os.environ:
            apikey = os.environ["apikey"]
        else:
            apikey = 'guest:guest'
    else:
        apikey = userkey
    if apikey != 'guest:guest':
        fn.credCheck(apikey)
    return 'Logged with ' + apikey.split(":")[0]

_event = []

def subscribe(ev):
    def upperCaseList(list):
        finalList = []
        while len(list) > 0:
            oneSymbol = list.pop()
            if ':' in oneSymbol:
                oneSymbol = oneSymbol.upper()
            else:
                oneSymbol = oneSymbol.lower()
            finalList.append(oneSymbol)
        return finalList
    
    global _event 
    if type(ev) is list:
        ev = upperCaseList(ev)
        _event += ev
    else:
        if ',' in ev:
            evList = ev.split(',')
            evList = upperCaseList(evList)
            _event += evList
            return 
        
        if ':' in ev:
            ev=ev.upper()
        else:
            ev=ev.lower()

        _event.append(ev)

    print('You are subscribed to:' + str(_event))




    