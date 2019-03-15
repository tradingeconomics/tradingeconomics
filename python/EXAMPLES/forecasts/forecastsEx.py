
import tradingeconomics as te
te.login('guest:guest')


#without a client key only a small sample of data will be given.
#With no output_type defined, the result will be of the dictionary type, 'df' returns pandas dataframe. 


#To get forecast data by country
mydata = te.getForecastData(country = 'United States', output_type= 'df')
print(mydata)

print("===============================================================================================================")

#To get forecast data by indicator
mydata = te.getForecastData( indicator = 'Imports', output_type= 'df')
print(mydata)

print("===============================================================================================================")

#To get forecast data by country and indicator
mydata = te.getForecastData(country = 'United States', indicator = 'Imports')
print(mydata)

print("===============================================================================================================")

#To get forecast data by several countries and indicators 
mydata = te.getForecastData(country = ['United States', 'India'], indicator = ['Imports','Exports'], output_type= 'df')
print(mydata)







