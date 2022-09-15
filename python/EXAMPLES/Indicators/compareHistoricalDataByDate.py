import tradingeconomics as te
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta

te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To compare historical data by the same time period in different years
    # Set initial(initDate) and end (endDate) dates to get the first year.
    # Use 'year' parameter to get the other year. year=1 means 1 year before the initial date.
def compareHistoricalDataByDate(country=None, indicator=None, initDate=None, endDate=None, year=None, output_type=None):

    #Converting initDate to date type
    initDate = datetime.strptime(str(initDate), '%Y-%m-%d') 
    initDate = str(initDate.date())

    #Getting the other initDate
    initDateMinusYear = datetime.strptime(str(initDate), '%Y-%m-%d') 
    initDateMinusYear = str((initDateMinusYear - relativedelta(years=year)).date()) 
    
    #Getting endDate
    if endDate == None:
        endDate = str((datetime.now()).date())
    
    #Getting the other endDate
    endDateMinusYear = datetime.strptime(str(endDate), '%Y-%m-%d')
    endDateMinusYear = str((endDateMinusYear - relativedelta(years=year)).date()) 

    #API request
    data = te.getHistoricalData(country=country, indicator=indicator, initDate=initDateMinusYear, endDate=endDate, output_type='raw')
    
    #Filtering the dates
    dataYear1 = list(filter(lambda x:True if x['DateTime'] >= initDate else False,data))
    dataYear2 = list(filter(lambda x:True if x['DateTime'] >= initDateMinusYear and x['DateTime'] <= endDateMinusYear else False, data))

    return [pd.DataFrame(dataYear1), pd.DataFrame(dataYear2)]

mydata = compareHistoricalDataByDate(country='brazil', indicator='currency', initDate='2022-07-01', year=1, output_type='df')
print(mydata)