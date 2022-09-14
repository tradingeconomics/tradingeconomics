import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting symbol name in square brackets [] will result, by default
## in the dictionary type for several symbols.
## EXE: symbols = ['aapl:us', 'indu:ind']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get market forecasts for major stock market indexes. Category can be: bond, currency, index, commodity and crypto.
mydata = te.getMarketsForecasts('index', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get market forecasts for major exchange rates
mydata = te.getMarketsForecasts('currency', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get market forecasts for major cryptocurrencies
mydata = te.getMarketsForecasts('crypto', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get market forecasts for major commodities
mydata = te.getMarketsForecasts('commodity', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get market forecasts for major bonds
mydata = te.getMarketsForecasts(category='bond', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get major market forecasts by symbol
mydata = te.getMarketsForecasts(symbol='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\marketForecatsEx.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
