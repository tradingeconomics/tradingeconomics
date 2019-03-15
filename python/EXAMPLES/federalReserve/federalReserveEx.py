import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Get Federal Reserve states
mydata = te.getFedRStates(county = None, output_type = None)

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve county
mydata = te.getFedRStates(county = 'arkansas', output_type = None)

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve snapshots by symbol
mydata = te.getFedRSnaps(symbol = 'AGEXMAK2A647NCEN')

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve snapshots by url
mydata = te.getFedRSnaps(url = 'united states''/united-states/white-to-non-white-racial-dissimilarity-index-for-benton-county-ar-fed-data.html')

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve snapshots by country
mydata = te.getFedRSnaps(country = 'united states')

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve snapshots by state and page number
mydata = te.getFedRSnaps(state = 'tennessee', page_number = 5)

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve snapshots by state and page number
mydata = te.getFedRSnaps(county = 'arkansas', page_number = 3)

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve historical data by symbol
mydata = te.getFedRHistorical(symbol = 'racedisparity005007', output_type = None)

print(mydata)

print("===============================================================================================================")

#Get Federal Reserve historical data by symbols
mydata = te.getFedRHistorical(symbol = ['racedisparity005007', '2020ratio002013'], output_type = None)

print(mydata)

