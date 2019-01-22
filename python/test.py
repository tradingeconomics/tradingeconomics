import tradingeconomics as te

te.login('n79l8wejd56zm4j:ohsu9f1psrdl43y') 

a = te.getForecastData(indicator = 'interbank rate', output_type = 'df')
print (a)

#https://tradingeconomics.com/api/indicators.aspx