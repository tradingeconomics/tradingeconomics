import tradingeconomics as te
from datetime import datetime
import time
import csv
import sys
import pandas as pd

def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in range(0, len(l), n):
        yield l[i:i + n]


def main():
    """Gets several historical data series from different countries and stores them in several CSV files. 
       The CSVs are named as follows: <indicator>_<date>.csv.
       The end date is always the current date.
    """
    te.login('guest:guest') #Insert your API Key

    countries = ['United States', 'Germany', 'China', 'United Kingdom', 'Portugal', 'Spain', 'France', 'Japan', 'Australia'] #Choose your Countries
    indicators = ['GDP', 'Interest Rate', 'Population'] #Choose your indicators. WARNING: It must be written like on https://api.tradingeconomics.com/indicators.
    today_date = datetime.now().strftime("%Y-%m-%d")

    for indicator in indicators:
        csv_file_name = indicator + "_" + today_date+".csv"
        pfa = pd.DataFrame()
        print("----------------")
        print(indicator)
        for countries_chunk in chunks(countries, 3): 
            print(countries_chunk)
            mydata = te.getHistoricalData(country = countries_chunk, indicator = [indicator],  initDate = '1950-01-01', endDate = today_date  ) #Choose initDate or EndDate
            for country in countries_chunk:
                for a in mydata[country][indicator][0]:
                    dfa = a.to_frame()
                    pfa = pd.concat([pfa, dfa],axis=1) #axis=1, concatenation on the columns.
            time.sleep(1)
        pfa.to_csv(csv_file_name, header=countries)


if __name__ == "__main__":
    main()