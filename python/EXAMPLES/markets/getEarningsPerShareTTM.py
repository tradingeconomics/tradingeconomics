import tradingeconomics as te
from datetime import datetime
from dateutil.relativedelta import relativedelta

te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To get earning per share (Trailing 12 Months) TTM. Empty date returns the lasts earnings.
def getEarningsPerShareTTM(symbols=None, date=None, output_type=None):
    if date == None:
        date = str((datetime.now()).date())

    initDate = datetime.strptime(str(date), '%Y-%m-%d')
    initDate = str((initDate - relativedelta(years=1)).date())

    data = te.getEarnings(symbols=symbols, initDate=initDate, endDate=date, output_type='df')

    eps = data['Actual'].astype(float)
    eps = eps.sum()

    return round(eps, 2)

#mydata = getEarningsPerShareTTM(symbols='aapl:us', date='2022-09-13', output_type='df')
#print(mydata)