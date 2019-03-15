import pandas as pd
import tradingeconomics as te

#without a client key only a small sample of data will be given.
te.login('guest:guest')

#Get the latest updates 
mydata = te.getLatestUpdates()

print(mydata)

print("===============================================================================================================")

#Get the latest updates from a specific date 
mydata = te.getLatestUpdates(initDate = '2018-08-15')

print(mydata)

