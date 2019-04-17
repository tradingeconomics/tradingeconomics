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
    
    global _event 
    if type(ev) is list:
        _event += ev
    else:
        _event.append(ev)

    print('You are subscribed to:' + str(_event))




    