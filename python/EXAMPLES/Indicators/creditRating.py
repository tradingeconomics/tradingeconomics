import pandas as pd
import tradingeconomics as te

#without a client key only a small sample of data will be given.
te.login('guest:guest')


#Getting credit rating by country
mydata = te.getRatings(country = 'United States', rating = None)

print(mydata)

print("===============================================================================================================")

#Getting credit rating from several countries
mydata = te.getRatings(country = ['United States', 'Portugal'])

print(mydata)