from . import functions as fn

def login(userkey = None):
    global apikey
    if userkey == None:
        apikey = 'guest:guest'
    else:
        apikey = userkey
    if apikey != 'guest:guest':
        fn.credCheck(apikey)
    return 'You are logged in as a ' + apikey

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




    