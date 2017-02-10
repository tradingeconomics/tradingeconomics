import functions as fn

def login(userkey = None):
    global apikey
    if userkey == None:
        apikey = 'guest:guest'
    else:
        apikey = userkey
    if apikey != 'guest:guest':
        fn.credCheck(apikey)
    return apikey