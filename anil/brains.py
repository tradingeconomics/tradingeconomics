import requests
import json

api_key = 'guest:guest'
url = f'https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?q=nigeria&pp=50&p=0&_=1557934352427&stance=2'
data = requests.get(url).json()

# Pretty print the JSON data
print(json.dumps(data, indent=2))