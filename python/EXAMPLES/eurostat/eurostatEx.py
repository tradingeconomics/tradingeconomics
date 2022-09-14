import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To list the countries available.
mydata = te.getEurostatData(lists='countries', output_type='df')
print(mydata)
print("===============================================================================================================")

# To list the categories and category groups available.
mydata = te.getEurostatData(lists='categories', output_type='df')
print(mydata)
print("===============================================================================================================")

# to get Eurostat data by Category Group.
mydata = te.getEurostatData(category_group='Poverty', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get Eurostat data by Category.
mydata = te.getEurostatData(category='People at risk of income poverty after social transfers', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get Eurostat data by Country.
mydata = te.getEurostatData(country='Denmark', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get Eurostat data by Country and category.
mydata = te.getEurostatData(country='Denmark', category='People at risk of income poverty after social transfers', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get Eurostat data by Country and category group.
mydata = te.getEurostatData(country='Denmark', category_group='Poverty', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by ID.
mydata = te.getHistoricalEurostat(ID='24804', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by ID and a start date.
mydata = te.getHistoricalEurostat(
    ID='24804', initDate='2015-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get historical data by ID and a date range.
mydata = te.getHistoricalEurostat(
    ID='24804', initDate='2015-01-01', endDate='2020-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\eurostat\eurostat.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

