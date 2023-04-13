import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To list World Bank main categories
mydata = te.getWBCategories(category=None, output_type='df')
print(mydata)
print("===============================================================================================================")

# To list by the main categories
mydata = te.getWBCategories(category='Demographics', output_type='df')
print(mydata)
print("===============================================================================================================")

# To ger getailed information about specific indicator for all countries using a series code from the previous method
mydata = te.getWBIndicator(series_code='SE.ADT.1524.LT.FE.ZS', output_type='df')
print(mydata)
print("===============================================================================================================")

# To tist the indicators available for a specific country
mydata = te.getWBCountry(country='Portugal', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get detailed information just for a specific indicator and country by using series code or url
mydata = te.getWBIndicator(series_code='usa.fr.inr.rinr', output_type='df')

mydata = te.getWBIndicator(url='/united-states/real-interest-rate-percent-wb-data.html', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data for a specific indicator
mydata = te.getWBHistorical(series_code='usa.fr.inr.rinr', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\worldBank\worldBank.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

