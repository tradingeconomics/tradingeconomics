import matplotlib.pyplot as plt
import numpy as np
import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Getting historical data by country, indicator and date. Output type will be pandas dataframe 
mydata = te.getHistoricalData(country = 'United States', indicator = 'Exports', initDate= '1990-01-01', endDate= '2015-01-01')
print(mydata)

print("===============================================================================================================")

#Putting country name or indicator name in square brackets the result, by default, will be of the dictionary type. For several countries and indicators
mydata = te.getHistoricalData(country = ['United States', 'Germany'], indicator = ['Exports','Imports', 'GDP'], initDate= '1990-01-01', endDate= '2015-01-01')
print(mydata)

print("===============================================================================================================")


mydata = te.getHistoricalData(country = 'United states', indicator = 'Imports')
plt.title("United states - Imports")
plt.grid(True)


plt.plot(mydata)
plt.show()


