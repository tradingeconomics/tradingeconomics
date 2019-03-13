import tradingeconomics as te

te.login('E7B603832B1048B:66EBB7ED5DC548C')



a = te.getWBCategories(category = ['education', 'agriculture'], page_number =3, output_type = None)
print (a)