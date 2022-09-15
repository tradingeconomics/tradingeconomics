import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get the list of Credit Ratings by country.
mydata = te.getRatings(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the credit rating data by specific country
mydata = te.getRatings(country='mexico', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the credit rating data by multiple countries
mydata = te.getRatings(country=['mexico', 'sweden'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the historical credit rating data for specific country
mydata = te.getHistoricalRatings(country='mexico', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the historical credit rating data for multiple countries
mydata = te.getHistoricalRatings(country=['mexico', 'sweden'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the historical credit rating data for specific country by start date
mydata = te.getHistoricalRatings(country='mexico', initDate='2010-08-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the historical credit rating data specific country by start and end date
mydata = te.getHistoricalRatings(country='mexico', initDate='2010-08-01', endDate='2012-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\Indicators\creditRating.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
