import os
import requests
import tradingeconomics as te
#import flask from Flask,request,render_template

#The api was insert from environment variable by running  #export apikey='guest:guest' as mention in the documentation

# Retrieve API key from environment variables
API_KEY = os.getenv("apikey")



def fetch_trading_data():
            
    #url = f'https://api.tradingeconomics.com/country/{countries_str}'
    url = f'https://api.tradingeconomics.com/country/all/gdp?c={API_KEY}'
 
    response = requests.get(url)
    # Check if the request was successful
    if response.status_code == 200:
        # Print the JSON response
        return response.json()
    else:
        # Print an error message if the request failed
        print(f"Failed to retrieve data. Status code: {response.status_code}")


def fetch_commodity_data ():
    url = f'https://api.tradingeconomics.com/search/mexico?category=markets&c={API_KEY}'
    
    response = requests.get(url)
     # Check if the request was successful
    if response.status_code == 200:
         # Print the JSON response
        return response.json()
    else:
         # Print an error message if the request failed
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        
# Buiiding a  a webpage using an endpoit in the docs  and a time series

def fetch_symbol_serie():
    url = f'https://api.tradingeconomics.com/comtrade/historical/PRTESP24031,NORZWEXX991?c={API_KEY}'
    response = requests.get(url)
     # Check if the request was successful
    if response.status_code == 200:
         # Print the JSON response
        return response.json()
    else:
         # Print an error message if the request failed
        print(f"Failed to retrieve data. Status code: {response.status_code}")

#Function to get data base on q=term

def fetch_term_data(term):
    url = f'https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?q={term}&pp=50&p=0&_=1557934352427&stance=2'
    response = requests.get(url)
     # Check if the request was successful
    if response.status_code == 200:
         # Print the JSON response
        return response.json()
    else:
         # Print an error message if the request failed
        print(f"Failed to retrieve data. Status code: {response.status_code}")
