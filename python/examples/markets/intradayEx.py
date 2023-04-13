import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting symbol name in square brackets [] will result, by default
## in the dictionary type for several symbols.
## EXE: symbols = ['aapl:us', 'indu:ind']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get intraday prices for a single instrument
mydata = te.getMarketsIntraday(symbols='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get intraday prices for multiple instrument (max 5 symbols)
mydata = te.getMarketsIntraday(symbols=['aapl:us', 'stx:us'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter intraday prices by start date and hour
mydata = te.getMarketsIntraday(symbols='aapl:us', initDate='2018-03-13 15:30', output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter intraday prices by start and end date
mydata = te.getMarketsIntraday(symbols='aapl:us', initDate='2018-03-13', endDate='2018-08-08', output_type='df')
print(mydata)
print("===============================================================================================================")

# To Aggregate intraday prices by interval - allowed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h.
# Intradays are only available for the last 3 months.
mydata = te.getMarketsIntradayByInterval(symbol='aapl:us', interval='1m', initDate='2021-03-13', endDate='2021-03-17', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\intraday.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

