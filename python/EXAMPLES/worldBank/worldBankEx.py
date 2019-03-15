import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#Getting all the World Bank categories
mydata = te.getWBCategories()

print(mydata)

print("===============================================================================================================")

#Getting World Bank by categories and page number
mydata = te.getWBCategories(category = ['education', 'agriculture'], page_number =3, output_type = None)

print(mydata)

print("===============================================================================================================")

