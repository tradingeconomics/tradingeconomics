
import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Getting indicators data by country and indicator Output type will be pandas dataframe 
mydata = te.getIndicatorData(country = 'United States', indicators = 'Imports', output_type = 'df')
print(mydata)

print("===============================================================================================================")

#Putting country name or indicator name in square brackets the result, by default, will be of the dictionary type. For several countries and indicators
mydata = te.getIndicatorData(country = ['United States', 'Portugal'], indicators = ['Imports','Exports'], output_type = 'df')
print(mydata)

print("===============================================================================================================")

#To get historical data into a basic graphic chart
import matplotlib.pyplot as plt
import numpy as np



mydata = te.getIndicatorData(country='United states',indicators='Imports')

print(mydata)
print(mydata.keys(), list(mydata.values()))
plt.plot(list(mydata.keys()))

plt.show(mydata)


