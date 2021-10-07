# import tradingeconomics as te
import ClassLibrary as cl


import optparse

parser = optparse.OptionParser(usage='usage: %prog  [options]')
parser.add_option('-k', '--key', type=str, default='kjq3jx15aswdmed:77vy8tb3e7s5d45', help='request a package of symbols [default: %default]')

(options, args) = parser.parse_args()

session_key=options.key

if session_key == '':
    
    session_key = input('Please, Insert a key or press ENTER to use "guest:guest": ')
    if session_key == '':
        session_key='guest:guest'




session_operator = cl.Operator(session_key)









