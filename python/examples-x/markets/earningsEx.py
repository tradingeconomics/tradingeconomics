import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get default earnings calendar
mydata = te.getEarnings(output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter earnings calendar by date
mydata = te.getEarnings(initDate='2017-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter earnings calendar by instrument and date
mydata = te.getEarnings(symbols='msft:us', initDate='2016-01-01', output_type='df')

mydata = te.getEarnings(symbols='msft:us', initDate='2016-01-01', endDate='2017-12-31', output_type='df')
print(mydata)
print("===============================================================================================================")

# To filter earnings calendar by country
mydata = te.getEarnings(country='united states', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\markets\earnings.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())
