import requests

# Your Trading Economics API Key
API_KEY = "1e92856abb004fd:s1zhxexpoawwfvs"  # Replace with os.getenv("TRADING_ECONOMICS_API_KEY") for security


url = f'https://api.tradingeconomics.com/markets/historical/aapl:us,gac:com?c={API_KEY}'
data = requests.get(url).json()
print(data)
