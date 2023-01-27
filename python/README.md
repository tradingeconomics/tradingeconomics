
# Trading Economics - Python

![version](https://img.shields.io/badge/version-3.6-green.svg)

The Trading Economics Application Python package provides direct access to millions of time series with economic data, financial markets quotes, commodity prices, crypto currencies data and much more. It also allows you to query Trading Economics  real-time economic calendar and to subscribe to updates. 

#

## Installation


```bash
pip install tradingeconomics
```

Install directly from GitHub the latest version

```bash
git clone https://github.com/tradingeconomics/tradingeconomics/
cd tradingeconomics/python
python setup.py install
```

#

## Authentication


In command window launch python and type

```python
import tradingeconomics as te
te.login('guest:guest')
```
Please replace guest:guest with your API key or we will be returning sample data.

#

## Sample Usage

```python
te.getCalendarData()
te.getIndicatorData(country=['mexico', 'sweden'], output_type='df')
te.getMarketsData(marketsField = 'commodities')
te.getMarketsBySymbol(symbols='aapl:us')
te.getFinancialsData(symbol = 'aapl:us', output_type = 'df')
```

## More examples

https://github.com/tradingeconomics/tradingeconomics/tree/master/python/examples

#

## Docker

Try our python interface in a container without installing anything

```bash
docker run -it --name te-python tradingeconomics/python:latest
```
#

## Documentation

https://docs.tradingeconomics.com/?python


#

## Learn More

https://tradingeconomics.com/analytics/api.aspx

