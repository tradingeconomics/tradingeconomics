import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting symbol name in square brackets [] will result, by default
## in the dictionary type for several symbols.
## EXE: symbols = ['aapl:us', 'indu:ind']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To list the available commodities
mydata = te.getMarketsData(marketsField='commodities', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list the major Currencies
mydata = te.getMarketsData(marketsField='currency', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list currency Crosses
mydata = te.getCurrencyCross(cross='EUR', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list all crypto currency
mydata = te.getMarketsData(marketsField='crypto', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list all stock Market Indexes
mydata = te.getMarketsData(marketsField='index', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list all Government Bonds
mydata = te.getMarketsData(marketsField='bond', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list an individual Market (stock, index, currency, crypto, commodity or bond)
mydata = te.getMarketsBySymbol(symbols='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list an multiple Markets (stock, index, currency, crypto, commodity or bond)
mydata = te.getMarketsBySymbol(symbols=['aapl:us', 'gac:com'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of stocks by country ################################################
#mydata =
#print(mydata)
#print("===============================================================================================================")

# To list a snapshot of latest peers prices by market
mydata = te.getMarketsPeers(symbols='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock Market Index Components
mydata = te.getMarketsComponents(symbols='psi20:ind', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock descriptions by company symbols
mydata = te.getMarketsStockDescriptions(symbol='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock descriptions by country
mydata = te.getMarketsStockDescriptions(country='france', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock symbologies by symbol
mydata = te.getMarketsSymbology(symbol='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock symbologies by ticker
mydata = te.getMarketsSymbology(ticker='aapl', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get stock symbologies by ISIN
mydata = te.getMarketsSymbology(isin='US0378331005', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\markets.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

