import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.


#With no parameters a list of all articles will be provided.

#Get the latest articles for several countries and indicators
mydata = te.getArticles(country = ['United States', 'Portugal'], indicator = ['Imports','Interest rate'])

print(mydata)

print("===============================================================================================================")

#Get the latest articles with a start index and articles limit
mydata = te.getArticles(start = 2, lim = 4, output_type = 'df')

print(mydata)

print("===============================================================================================================")

#Getting the latest articles by country and within a date interval
mydata = te.getArticles(country = 'United States', initDate = '2019-02-10', endDate = '2019-03-10', output_type = 'df')

print(mydata)

print("===============================================================================================================")

#Get an article by it's id
mydata = te.getArticleId(id = '20580', output_type = None)

print(mydata)