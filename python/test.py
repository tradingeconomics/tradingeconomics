import pandas as pd
import os
import tradingeconomics as te

API_KEY = os.getenv("apikey")

# Initialize the Trading Economics client with your API key
te.login(API_KEY)
country=['mexico', 'sweden']
# To get the list of Credit Ratings by country.
mydata = te.getWBCountry(country = country ,output_type='df')
print(mydata.)
#print("===============================================================================================================")