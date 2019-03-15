import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Whith no parameters specified a sample of news will be provided
mydata = te.getNews()

print(mydata)

print("===============================================================================================================")

#Getting the latest news by country, indicator with a start index and a limit of news
mydata = te.getNews(country = 'United States', indicator = 'Imports', start = 10, limit = 20)

print(mydata)

print("===============================================================================================================")

#Get the latest news for several countries and indicators
mydata = te.getNews(country = ['United States', 'ireland'], indicator = ['Imports','balance-of-trade'])

print(mydata)

