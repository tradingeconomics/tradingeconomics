import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe. 

# To get historical data by specific country and indicator
mydata = te.getHistoricalData(country='mexico', indicator='gdp', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by specific country, indicator and start date
mydata = te.getHistoricalData(country='mexico', indicator='gdp', initDate='2013-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by specific country, indicator, start date and end date
mydata = te.getHistoricalData(country='mexico',  indicator='gdp', initDate='2015-01-01', endDate='2015-12-31', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data for specific country by multiple indicators
mydata = te.getHistoricalData(country='mexico', indicator=['gdp', 'population'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data for multiple countries by specific indicator
mydata = te.getHistoricalData(country=['mexico', 'sweden'], indicator='gdp', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data for multiple countries by multiple indicators
mydata = te.getHistoricalData(country=['mexico', 'sweden'], indicator=['gdp', 'population'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by ticker
mydata = te.getHistoricalByTicker(ticker='USURTOT', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical latest updates
mydata = te.getHistoricalUpdates(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get a list of discontinued indicators series for all countries
mydata = te.getDiscontinuedIndicator(output_type='df')
print(mydata)
print("===============================================================================================================")

#To get a list of discontinued indicators series by country
mydata = te.getDiscontinuedIndicator(country='united states', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get a list of discontinued indicators series with multiple countries.
mydata = te.getDiscontinuedIndicator(country=['united states', 'china'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\Indicators\indicatorsHistoricalEx.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
