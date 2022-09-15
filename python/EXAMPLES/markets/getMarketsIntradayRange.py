import tradingeconomics as te
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To get intraday days's range. You can set only initDate to get specific day's range.
# Empty date returns the last day's range.
def getMarketsIntradayRange(symbols=None, initDate=None, endDate=None, output_type=None):
    if initDate == None:
        initDate = str((datetime.now()).date())

    if endDate == None:
        endDate = datetime.strptime(str(initDate), '%Y-%m-%d')
        endDate = str((endDate + timedelta(days=1)).date())
    
    data = te.getMarketsIntraday(symbols=symbols, initDate=initDate, endDate=endDate, output_type='df')

    Range = np.array([min(data['Low']), max(data['High'])])

    return pd.DataFrame(Range)

mydata = getMarketsIntradayRange(symbols='aapl:us', initDate='2022-09-12', endDate = '2022-09-13', output_type='df')
print(mydata)