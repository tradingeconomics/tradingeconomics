
#Trading Economics - Python

The Trading Economics Application Programming Interface (API) provides direct access to our data. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. More at http://www.tradingeconomics.com/analytics/api.aspx


## Installation

You can get Python from:

https://www.python.org/downloads/

We support Python 2.7


Then you need to install the tradingeconomics package. You can do so in a variety of ways.

Install the tradingeconomics package using pip, a package management system used to install and manage software packages written in Python. In Windows Command Prompt or Linux bash type:
```bash
pip install tradingeconomics
```

Install using easy_install 
```python
easy_install https://pypi.python.org/packages/4c/b4/e2e2a9668be305a42c0644b3eb5d4d1034ae062653ef737d7e80c1423d28/tradingeconomics-0.2.3.tar.gz
```

Install directly from GitHub by downloading the latest folder from https://github.com/ieconomics/open-api/tree/master/python/dist and run

```bash
python setup.py install
```


###Getting Started

In command window type

```python
import tradingeconomics as te
te.login('APIkey')
```
If you don't have APIkey just left empty space in brackets.  

**Note:** Without APIkey  datasets will default to returning sample data.

Results are available in different formats, such as : JSON, pandas.DataFrame or dictionary.

To get calendar data for specific country, in data frame format, just type
```python
In [1]: te.getCalendarData(country = 'Italy', output_type = 'df')
Out[1]: 
                  Date Country         Category               Event Reference  \
0  2016-11-18T10:00:00   Italy  Current Account     Current Account       Sep   
1  2016-11-24T10:00:00   Italy      Wage Growth  Wage Inflation YoY       Oct   
2  2016-11-24T10:00:00   Italy      Wage Growth  Wage Inflation MoM       Oct   

  Unit                                    Source  Actual Previous Forecast  \
0                                 Banca D'italia  €2810M   €3282M            
1       National Institute of Statistics (ISTAT)             0.6%            
2       National Institute of Statistics (ISTAT)               0%            

  TEForecast  
0    € 2116M  
1       0.7%  
2       0.1%  
``` 
In some cases initial date and end date could be specified
```python
In [2]: te.getHistoricalData(country = 'United Kingdom', indicator = 'GDP', endDate= '2015-01-01')

Out[2]: 
                  0
2006-12-31  2588.08
2007-12-31  2969.73
2008-12-31  2793.38
2009-12-31  2314.58
2010-12-31  2403.50
2011-12-31  2594.90
2012-12-31  2630.47
2013-12-31  2712.30
2014-12-31  2990.20
```

For several countries and indicators
```python
te.getHistoricalData(country = ['United States', 'Germany'], indicator = ['Exports','Imports', 'GDP'], initDate= '1990-01-01', endDate= '2015-01-01')
```

To get stock market index just type
```python
te.getMarketsData(marketsField = 'index', output_type = 'df')
```

Forecasted values for specific country, in this case Portugal. 
```python
te.getForecastData(country = 'Portugal', output_type = 'df')
```

Next code will give you Country/Indicator pair
```python
te.getIndicatorData(country = 'United Kingdom', indicators = 'Imports')
```

###Bonus

Easy graphical representation
```python
import matplotlib.pyplot as plt
mydata = te.getHistoricalData(country = 'United Kingdom', indicator = 'GDP')
plt.plot(mydata)
```


and some statistics
```python
import numpy as np

np.average(mydata)
# 1081.0103571428572
np.median(mydata)
# 827.63999999999999
np.std(mydata)
# 953.846661
np.max(mydata)
# 2990.2
np.min(mydata)
# 72.33
```

