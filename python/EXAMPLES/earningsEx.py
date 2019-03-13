
import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#To get earnings by symbol and date
mydata = te.getEarnings(symbols = 'msft:us', initDate='2016-01-01', endDate='2017-12-31')
print(mydata)

print("===============================================================================================================")

#To get earnings by symbols 
mydata = te.getEarnings(symbols = ['4436:JP', ' BITA:US'])
print(mydata)

print("===============================================================================================================")

#To get earnings data by country and date
mydata = te.getEarnings(country = 'united states', initDate='2016-01-01', endDate='2017-12-31')
print(mydata)

print("===============================================================================================================")

#Getting earnings by several countries
mydata = te.getEarnings(country = ['japan', 'china'])
print(mydata)

print("===============================================================================================================")

#with no parameters data from all countries and symbols will be provided
mydata = te.getEarnings(output_type= 'df')
print(mydata)

