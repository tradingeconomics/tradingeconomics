import pandas as pd
import tradingeconomics as te

#without a client key only a small sample of data will be given.
te.login('guest:guest')

#get historical ratings by country
mydata = te.getHistoricalRatings(country = 'United States')

print(mydata)

print("===============================================================================================================")

#get historical ratings for several countries putting them in square brackets
mydata = te.getHistoricalRatings(country = ['United States', 'United Kingdom', 'china'])

print(mydata)

print("===============================================================================================================")

mydata = te.getHistoricalRatings(country = 'United States')

df = pd.DataFrame(mydata)
#to get an csv file from the pandas DataFrame
df.to_csv('ratingsHist.csv', index=False, header=True, sep='|')

#Get the code into an html table format so you can use in your html projects
print(mydata.to_html())