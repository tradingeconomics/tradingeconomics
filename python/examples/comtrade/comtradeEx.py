import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

#To get detailed information about Comtrade categories
mydata = te.getCmtCategories(output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get the latest updated indicators
mydata = te.getCmtUpdates(output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get total imports by main category. 'country' and 'type' parameters are not optional.
mydata = te.getCmtCountryByCategory(country='India', type='import', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get total exports by main category. 'country' and 'type' parameters are not optional.
mydata = te.getCmtCountryByCategory(country='United States', type='export', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get imports by specific category. 'country' and 'type' parameters are not optional.
mydata = te.getCmtCountryByCategory(country='united kingdom', type='import', category='Coffee, tea, mate and spices', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get exports by specific category. 'country' and 'type' parameters are not optional.
mydata = te.getCmtCountryByCategory(country='India', type='export', category='Live animals', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get detailed information about Comtrade countries
mydata = te.getCmtCountry(output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get snapshot of data per country
mydata = te.getCmtCountry(country='China', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get snapshot of data per country filtered by type: import or export.
mydata = te.getCmtCountryFilterByType(country1='Portugal', type='export', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get snapshot of trade between two countries.
mydata = te.getCmtTwoCountries(country1='Portugal', country2='Spain', output_type='df')
#print(mydata)
print("===============================================================================================================")

# To get snapshot of trade between two countries filtered by type: import or export
mydata = te.getCmtCountryFilterByType(country1='Portugal', country2='Spain', type='import', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get total imports by country
#mydata =
#print(mydata)
#print("===============================================================================================================")

# To get total emports by country
#mydata =
#print(mydata)
#print("===============================================================================================================")

# To get historical data
mydata = te.getHistorical('PRTESP24031:comtrade')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\comtrade\comtrade.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())



