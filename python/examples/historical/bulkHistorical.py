import tradingeconomics as te
from datetime import datetime
import time
import sys
import pandas as pd

def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in range(0, len(l), n):
        yield l[i:i + n]

def get_indicators():
    """
    Gets all indicators
    """
    all_indicators = te.getIndicatorData(output_type ="df")
    return all_indicators["Category"]

def get_countries(indi):
    """
    Gets all countries that has a certain indicator
    """
    countries = te.getIndicatorData("all", indi, output_type ="df")
    if not countries.empty:
        return list(countries["Country"])
    return None

def main():
    indicators = get_indicators()
    today_date = datetime.now().strftime("%Y-%m-%d")
    for indicator in list(indicators):
        countries = get_countries(str(indicator))
        if countries:
            for countries_chunk in chunks(countries, 1): 
                print(",".join(countries_chunk) + " - " + indicator)
                mydata = te.getHistoricalData(country = countries_chunk, indicator = [indicator],  initDate = '1800-01-01', endDate = today_date  ) #Choose initDate or EndDate
                print(mydata)
                # HERE: do something with the data
                time.sleep(1) #avoid throttling protection
                
if __name__ == "__main__":
    te.login('guest:guest') #Insert your API Key
    main()