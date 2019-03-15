import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Getting all the comtrade categories
mydata = te.getCmtCategories(category = None, output_type = None)

print(mydata)

print("===============================================================================================================")

#Get comtrade by country and page number
mydata = te.getCmtCountry(country = 'china' , page_number = 3, output_type = None)

print(mydata)

print("===============================================================================================================")

#Get comtrade by countries and page number
mydata = te.getCmtCountry(country = ['china', 'portugal'], page_number = 3, output_type = None)

print(mydata)

print("===============================================================================================================")

#Get comtrade historical by symbol
mydata = te.getCmtHistorical(symbol = 'PRTESP24031', output_type = None)

print(mydata)

print("===============================================================================================================")



