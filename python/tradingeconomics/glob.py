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


def subscribe(ev):
	global _event
	_event = ev
	return 'You are subscribed to ' + _event
