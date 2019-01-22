import tradingeconomics as te

te.login('guest:guest') 

a = te.getForecastData(country = 'commodity', indicator='copper', output_type = 'df')
print (a)