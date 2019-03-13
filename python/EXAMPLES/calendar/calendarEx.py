
import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#To get calendar data by country, category and date
mydata = te.getCalendarData(country = 'United States', category = 'Imports', initDate = '2011-01-01', endDate = '2016-01-01', output_type= 'df')
print(mydata)

print("===============================================================================================================")

#Putting country name or indicator name in square brackets the result, by default, will be of the dictionary type. For pandas dataframe choose output_type= 'df'
mydata = te.getCalendarData(country = ['japan', 'china'], category = [' Unemployment Rate','Balance of Trade'], initDate = '2017-01-01', endDate = '2018-01-01', output_type= 'df' )
print(mydata)

print("===============================================================================================================")

#with no parameters data from all countries and categories will be provided
mydata = te.getCalendarData(output_type= 'df')
print(mydata)



