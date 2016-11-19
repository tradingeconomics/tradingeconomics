
#Access Trading Economics Using Python

##Installation

If you don’t already have a copy of Python installed on your computer, you can get it from oficial website https://www.python.org/downloads/.  

It's recommended to install pip, it is a package management system used to install and manage software packages written in Python. All information you can find on https://packaging.python.org/installing/.
```python
pip install tradingeconomics
```

There is a possibility to install package using easy_install 
```python
easy_install https://pypi.python.org/packages/4c/b4/e2e2a9668be305a42c0644b3eb5d4d1034ae062653ef737d7e80c1423d28/tradingeconomics-0.2.9.tar.gz
```

As alternatyive you can download package from https://pypi.python.org/pypi/tradingeconomics and then follow the install instructions for [Python 3.x](https://docs.python.org/3/install/) or [Python 2.x](https://docs.python.org/2/install/)  

Another method is to download folder from GitHub https://github.com/ieconomics/open-api/tree/master/python and then place this folder in your Python library folder.

###Login
In command window type

```python
import tradingeconomics as te
te.login('APIkey')
```
If you don't have APIkey just left empty space in brackets.  

**Note:** Without APIkey  datasets will default to returning sample data.

###How to Use

Results are available in differente formats, such as : JSON, pandas.DataFrame or dictionary.

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

Forecasted values for spcifique countrie, in this case Portugal. 
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


and some stratistics
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

