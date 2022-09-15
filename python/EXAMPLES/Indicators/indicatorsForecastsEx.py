import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get forecast data by specific country
mydata = te.getForecastData(country='United States', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get forecast data by multiple country
mydata = te.getForecastData(country=['United States', 'china'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get forecast data by specific indicator
mydata = te.getForecastData(indicator='Imports', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get forecast data by multiple indicator
mydata = te.getForecastData(indicator=['Imports', 'Exports'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get forecast data by specific country and indicator
mydata = te.getForecastData(country='United States', indicator='Imports')
print(mydata)
print("===============================================================================================================")

# To get forecast data by multiple countries and indicators
mydata = te.getForecastData(country=['United States', 'India'], indicator=['Imports', 'Exports'], output_type=None)
print(mydata)
print("===============================================================================================================")

# To get forecast data by specific ticker
mydata = te.getForecastByTicker(ticker='usurtot', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get forecast data by multiple tickers
mydata = te.getForecastByTicker(ticker=['usurtot', 'wgdpchin'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\Indicators\indicatorsForecastsEx.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())