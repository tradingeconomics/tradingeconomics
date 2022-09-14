import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting symbol name in square brackets [] will result, by default
## in the dictionary type for several symbols.
## EXE: symbols = ['aapl:us', 'indu:ind']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get market historical data for 1 instrument
mydata = te.getHistorical('aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get market historical Data for multiple instruments
mydata = te.getHistorical(['aapl:us', 'gac:com'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter market historical data by date
mydata = te.fetchMarkets(symbol='aapl:us', initDate='2017-01-01', endDate='2017-06-15', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\marketsHistoricalEx.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())