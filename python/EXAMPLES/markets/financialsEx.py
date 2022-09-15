import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To get financials companies list.
mydata = te.getFinancialsData(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get financials companies list filtered by country.
mydata = te.getFinancialsData(country='united states', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get financials companies list filtered by more than one country (MAX countries = 5).
mydata = te.getFinancialsData(country=['united states', 'china'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get financials data by stock symbol
mydata = te.getFinancialsData(symbol='aapl:us', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical financials data by instrument symbol.
mydata = te.getHistoricalFinancials('aapl:us', category='assets', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\financials.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
