import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

#To get the latest updates
mydata = te.getLatestUpdates(output_type='df')
print(mydata)
print("===============================================================================================================")

#To get the latest updates from a specific date
mydata = te.getLatestUpdates(init_date='2018-08-15', output_type='df')
print(mydata)
print("===============================================================================================================")

#To get the latest updates since a specific date and time
mydata = te.getLatestUpdates(init_date='2021-10-18', time='15:20', output_type='df')
print(mydata)
print("===============================================================================================================")

#To get the latest updates by specific country.
mydata = te.getLatestUpdates(country='portugal', output_type='df')
print(mydata)
print("===============================================================================================================")

#To get the latest updates by specific country since a specific date
te.getLatestUpdates(country='portugal', init_date='2018-08-15', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\Indicators\latestUpdates.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
