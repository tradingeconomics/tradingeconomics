import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Get markets by symbol
mydata = te.fetchMarkets(symbol = 'indu:ind')
print(mydata)

print("===============================================================================================================")

#Get markets by symbol and date
mydata = te.fetchMarkets(symbol = 'indu:ind', initDate = '2017-01-01', endDate = '2017-06-15', output_type='raw')
print(mydata)

print("===============================================================================================================")

#Get markets by symbols and date
mydata = te.fetchMarkets(symbol = ['aapl:us', 'indu:ind'], initDate = '2017-01-01', endDate = '2017-06-15')
print(mydata)    
    
print("===============================================================================================================")










