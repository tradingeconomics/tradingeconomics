import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To get the list of all indicators.
mydata = te.getIndicatorData(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of all countries.
mydata = te.getAllCountries(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of indicators by country.
mydata = te.getIndicatorData(country='mexico', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of indicators by country and group(you can check groups in the "categoryGroup" field of /indicators)
mydata = te.getIndicatorByCategoryGroup(country='mexico', category_group='gdp', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the indicator data by specific indicator for all countries.
mydata = te.getIndicatorData(country='all', indicators='gdp', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get indicator data by specific ticker or tickers
mydata = te.getIndicatorByTicker(ticker='usurtot', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of indicator peers by ticker.
mydata = te.getPeers(ticker='CPI YOY', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of indicator peers by country.
mydata = te.getPeers(country='mexico', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of indicator peers by country and category.
mydata = te.getPeers(country='mexico', category='money', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\Indicators\indicators.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
