
### Trading Economics - Python

The Trading Economics Application Programming Interface (API) provides direct access to our data. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. More at https://tradingeconomics.com/analytics/api.aspx


## Installation

You can get Python from:

https://www.python.org/downloads/

We support Python 2.7


Then you need to install the tradingeconomics package. You can do so in a variety of ways.

Install the tradingeconomics package using pip, a package management system used to install and manage software packages written in Python. In Windows Command Prompt or Linux bash type:
```bash
pip install -i https://pypi.python.org/pypi tradingeconomics==0.2.7 
```
Note: check if 0.2.7 is a latest version

To update existing package to the latest version:
```bash
pip install -i https://pypi.python.org/pypi tradingeconomics -U
```
      
Install using easy_install 
```python
easy_install https://pypi.python.org/packages/67/ef/fce59528d5f772c8ecf8ae21f119a976c3c7aa740646a4eb4d536b3e4442/tradingeconomics-0.2.73.zip
```

Install directly from GitHub by downloading https://github.com/ieconomics/open-api/archive/v0.2.73.zip and run

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

**Note:** Without APIkey  data sets will default to returning sample data.

Results are available in different formats, such as : JSON, pandas.DataFrame or dictionary.



