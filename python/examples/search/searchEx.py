import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

## Without a client key only a small sample of data will be given.

## With no output_type defined, the result will be of the dictionary type.
## Use output_type='df' to display in pandas dataframe.

# To list of categories available.
mydata = te.getSearch(output_type='df')
print(mydata)
print("===============================================================================================================")

# To search for term/keyword by category.
mydata = te.getSearch(term='japan', category='markets', output_type='df')
print(mydata)
print("===============================================================================================================")

# To search for term/keyword in all categories available.
mydata = te.getSearch(term='gold', output_type='df')
print(mydata)
print("===============================================================================================================")

# To get your data into a csv file
df = pd.DataFrame(mydata)
path = r'python\EXAMPLES\search\search.csv'
df.to_csv(path, index=False, header=True, sep='|')

# If you want the code into an html table format, you can use the example below in your html projects
# print(mydata.to_html())

