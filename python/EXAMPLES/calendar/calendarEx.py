import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get all calendar events
mydata = te.getCalendarData(output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get all calendar events by importance (1-Low, 2-Medium, 3-High)
mydata = te.getCalendarData(importance='1', output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get calendar events by date or by date and importance
mydata = te.getCalendarData(initDate='2016-02-01', endDate='2016-02-02', output_type='df')

mydata = te.getCalendarData(initDate='2016-02-01', endDate='2016-02-02', importance='3', output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get calendar events for specific country or by country and importance
mydata = te.getCalendarData(country='united states', output_type='df')

mydata = te.getCalendarData(country='united states', importance='2',  output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get calendar events for a specific indicator or by indicator, importance and date
mydata = te.getCalendarData(category='inflation rate', output_type='df')

mydata = te.getCalendarData(category='inflation rate', importance='2',  output_type='df')

mydata = te.getCalendarData(category='inflation rate', initDate='2018-02-01', endDate='2018-02-02', output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get all calendar events for multiple countries or by countries and importance
mydata = te.getCalendarData(country=['japan', 'china'], output_type='df')

mydata = te.getCalendarData(country=['japan', 'china'], importance='2', output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To get calendar events for a specific country and specific indicator
mydata = te.getCalendarData(country='united states', category='initial jobless claims', output_type='df')
#print(mydata)
#print("===============================================================================================================")

# To filter calendar events by calendar ID
mydata = te.getCalendarId(id='174108')
#print(mydata)
#print("===============================================================================================================")

# To filter calendar events by ticker and date
mydata = te.getCalendarData(ticker=['IJCUSA',  'SPAINFACORD',  'BAHRAININFNRATE'], initDate='2017-06-07', endDate='2017-12-31', output_type='df')
#print(mydata)
#print("===============================================================================================================")

#Get calendar latest updates
mydata = te.getCalendarUpdates(output_type='df')
print(mydata)
#print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\calendar\calendar.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())



