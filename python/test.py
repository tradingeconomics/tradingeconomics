import tradingeconomics as te

te.login('E7B603832B1048B:66EBB7ED5DC548C')



a = te.getHistoricalData(country = ['United States', 'china'], indicator = ['Imports','Exports'], initDate = '2011-01-01', endDate = '2016-01-01')
print (a)