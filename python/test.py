import tradingeconomics as te

te.login('E7B603832B1048B:66EBB7ED5DC548C')


a = te.getArticles(country = ['portugal', 'china'], indicator = None, initDate = '2015-10-10', endDate = '2017-10-10', start = 29, lim = 100, output_type = None)


a = te.getArticleId(id = '20582', output_type = None)



a = te.getLatestUpdates(initDate = '2018-08-15', output_type = None)
print a