import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## Putting country name or indicator name in square brackets [] will result, by default
## in the dictionary type for several countries and indicators.
## EXE: country=['mexico', 'sweden']

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To get the latest news.
mydata = te.getNews(output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news within a date range.
mydata = te.getNews(start_date='2021-02-02', end_date='2021-03-03', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by country.
mydata = te.getNews(country='mexico', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by country and dates.
mydata = te.getNews(country='mexico', start_date='2021-02-02', end_date='2021-03-03', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by indicator.
mydata = te.getNews(indicator=['inflation rate', 'gdp'], output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by indicator and dates.
mydata = te.getNews(indicator='inflation rate', start_date='2021-02-02', end_date='2021-03-03', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by country and indicator.
mydata = te.getNews(country='mexico', indicator='inflation rate', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get news by country, indicator and dates.
mydata = te.getNews(country='mexico', indicator='inflation rate', start_date='2021-02-02', end_date='2021-03-03', output_type='df')
print(mydata)
print("===============================================================================================================")

# To paginate news list by specifying start index and list size.
mydata = te.getNews(start=10, limit=5, output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\news\news.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

