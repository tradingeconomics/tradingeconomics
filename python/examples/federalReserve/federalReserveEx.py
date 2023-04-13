import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting symbol name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: symbol=['racedisparity005007', '2020ratio002013']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get the list of all US states
mydata = te.getFedRStates(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get the list of all counties per state
mydata = te.getFedRStates(county='arkansas', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by symbol
mydata = te.getFedRSnaps(symbol='ALLMARGATTN', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by URL
mydata = te.getFedRSnaps(
    url='united states''/united-states/white-to-non-white-racial-dissimilarity-index-for-benton-county-ar-fed-data.html', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by country
mydata = te.getFedRSnaps(country='united states', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by state
mydata = te.getFedRSnaps(state='tennessee', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by county
mydata = te.getFedRCounty(output_type='df')

#print(mydata)
print("===============================================================================================================")

# To get data accessed only through symbol
mydata = te.getHistorical('racedisparity005007:fred', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by multiple symbols
mydata = te.getFedRHistorical(symbol=['racedisparity005007', '2020ratio002013'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by symbol and a start date
mydata = te.getFedRHistorical(symbol=['racedisparity005007', '2020ratio002013'], initDate='2018-05-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get data by symbol and a date range
mydata = te.getFedRHistorical(symbol=['racedisparity005007', '2020ratio002013'], initDate='2018-05-01', endDate='2019-01-01', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\federalReserve\federalReserve.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

