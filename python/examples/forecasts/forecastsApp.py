import csv
import pandas as pd
from flask import Flask, render_template
import tablib
import os

import tradingeconomics as te
te.login('guest:guest')

mydata = te.getForecastData(country = ['United States', 'India'], indicator = ['Imports','Exports'], output_type= 'df')
df = pd.DataFrame(mydata)
#to get an csv file from the pandas DataFrame
df.to_csv('forecasts.csv', index=False, header=True)
#If you want the code into an html format you can use in your html projects
print(mydata.to_html())

#a simple app using the html format from above
app = Flask (__name__)
dataset = tablib.Dataset()
with open(os.path.join(os.path.dirname(__file__),'forecasts.csv')) as f:
    dataset.csv = f.read()
 
@app.route("/")
def index():
    data = dataset.html
    #return dataset.html
    return render_template('index.html', data=data)
 
if __name__ == "__main__":
    app.run()

