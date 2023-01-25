
# Trading Economics - Python

The Trading Economics Application Programming Interface (API) provides direct access to our data. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. More at https://tradingeconomics.com/analytics/api.aspx

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

## Documentation

https://docs.tradingeconomics.com/?python

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx

