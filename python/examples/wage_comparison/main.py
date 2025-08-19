import tradingeconomics as te
from dotenv import load_dotenv
load_dotenv()
import os
import matplotlib.pyplot as plt
import requests

te.login(os.environ["API_KEY"])

def getExchangeRate(symbol):
    API_KEY = os.environ["EX_API_KEY"]
    url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    return data["conversion_rates"][symbol]

def getCategory(forcasts, key):
    for each in forcasts: 
        if each["Category"] == key: return each
    raise Exception("Category not present")


forcasts_MEXICO = te.getForecastData(country='mexico')
forcasts_SWEDEN = te.getForecastData(country='sweden')

wages_manfac_sweden = getCategory(forcasts_SWEDEN, "Wages in Manufacturing")
wages_manfac_mexico = getCategory(forcasts_MEXICO, "Wages in Manufacturing")

unit_mexico = wages_manfac_mexico["Unit"].split("/")[0]
unit_sweden = wages_manfac_sweden["Unit"].split("/")[0]

rate_mexico = getExchangeRate(unit_mexico)
rate_sweden = getExchangeRate(unit_sweden)

dates = [
    wages_manfac_sweden["q1_date"].split("T")[0], 
    wages_manfac_sweden["q2_date"].split("T")[0], 
    wages_manfac_sweden["q3_date"].split("T")[0], 
    wages_manfac_sweden["q4_date"].split("T")[0]
    ]

wages_sweden = [
    wages_manfac_sweden["q1"]/rate_sweden, 
    wages_manfac_sweden["q2"]/rate_sweden, 
    wages_manfac_sweden["q3"]/rate_sweden, 
    wages_manfac_sweden["q4"]/rate_sweden
    ] 
wages_mexico = [
    wages_manfac_mexico["q1"]/rate_mexico, 
    wages_manfac_mexico["q2"]/rate_mexico, 
    wages_manfac_mexico["q3"]/rate_mexico, 
    wages_manfac_mexico["q4"]/rate_mexico, 
    ]

plt.plot(dates, wages_sweden, marker='o', linestyle='-', color='magenta', label="Sweden")
plt.plot(dates, wages_mexico, marker='s', linestyle='--', color='navy', label="Mexico")

plt.xlabel('Date')
plt.ylabel('Wages')
plt.title('Hourly Wages in Manufacturing (Monthly) USD')

plt.legend()
plt.show()