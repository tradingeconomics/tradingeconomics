import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Accepted values for marketsField are 'commodity', 'currency', 'index' or 'bonds'
mydata = te. getMarketsData(marketsField = 'index')
print(mydata)

print("===============================================================================================================")

#Get markets by symbol
mydata = te.getMarketsBySymbol(symbols = 'indu:ind')
print(mydata)

print("===============================================================================================================")

#Get markets by symbol, output_type default is 'df' pandas dataframe
mydata = te.getMarketsBySymbol(symbols = ['aapl:us', 'indu:ind'])
print(mydata)

print("===============================================================================================================")

#Get markets intraday by symbol
mydata = te.getMarketsIntraday(symbols = 'indu:ind')
print(mydata)

print("===============================================================================================================")

#Get markets intraday by symbol and initial date
mydata = te.getMarketsIntraday(symbols = 'indu:ind', initDate='2018-03-13 15:30')
print(mydata)

print("===============================================================================================================")

#Get markets intraday by symbols within a date time interval
mydata = te.getMarketsIntraday(symbols = ['aapl:us', 'indu:ind'], initDate='2018-03-13', endDate='2018-04-01')
print(mydata)

print("===============================================================================================================")

#Get markets peers by symbols 
mydata = te.getMarketsPeers(symbols = 'indu:ind')
print(mydata)

print("===============================================================================================================")

#Get markets peers by symbols 
mydata = te.getMarketsPeers(symbols = ['aapl:us', 'indu:ind'])
print(mydata)

print("===============================================================================================================")

#Get markets components by symbol
mydata = te.getMarketsComponents(symbols = 'psi20:ind')
print(mydata)

print("===============================================================================================================")

#Get markets components by symbol
mydata = te.getMarketsComponents(symbols = ['psi20:ind', 'indu:ind'])
print(mydata)

print("===============================================================================================================")


