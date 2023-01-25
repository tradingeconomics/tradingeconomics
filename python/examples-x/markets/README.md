#Markets examples

In this folder you can find examples on how to get data from markets using python.
Remember that without a client key to login, only a sample of data will be provided.

#**marketsEx**

Shows how to get data with diferent parameters, and output types.

*You can get the markets index data in a pandas DataFrame output:*
```python
         Symbol          Ticker                Name               Country                 Date     ...       yesterday    lastWeek   lastMonth    lastYear   startYear
0  SECTMIND:IND        SECTMIND            SECTMIND                Kuwait  2018-03-29T00:00:00     ...        415.7800    409.7100    413.2000    413.2000    413.2000
2   CRSMBCT:IND         CRSMBCT            BCT Corp            Costa Rica  2019-02-14T00:00:00     ...      10712.6100  11207.1200  11533.5700  13898.7900  11533.7000
3       ADR:IND             ADR  NYSE International         United States  2019-03-14T00:00:00     ...       5419.0800   5306.2200   5336.0200   5730.8100   4904.3400
4     ADSMI:IND        UANBGENL         ADX General  United Arab Emirates  2019-03-14T00:00:00     ...       4819.8330   4914.3860   5069.0680   4533.1100   4866.6430
5   BELEX15:IND    SERBIASTOMAR            BELEX 15                Serbia  2019-03-14T00:00:00     ...        705.4700    693.4800    684.9700    748.7800    731.7900
6    BGSMDC:IND  BOTSWANASTOMAR            Gaborone              Botswana  2019-03-14T00:00:00     ...       7878.4600   7881.2300   7879.8900   8680.0100   7863.1900
7    BHSEEI:IND   BAHRAINSTOMAR             Estirad               Bahrain  2019-03-14T00:00:00     ...       1411.2120   1408.9200   1380.7190   1352.4900   1329.4710
8       BKA:IND             BKA     All-Share Index                Kuwait  2019-03-14T00:00:00     ...       5302.5000   5309.6900   5188.0500   4963.3400   5109.6200
9      BLOM:IND   LEBANONSTOMAR                Blom               Lebanon  2019-03-14T00:00:00     ...        956.7883    973.5495    945.4122   1171.7051    976.7547

[9 rows x 24 columns]
```

*And markets by symbol in a pandas DataFrame output too:*
```python
     Symbol                 Date        Open        High         Low       Close
0  INDU:IND  2019-03-15T14:57:00  25668.3496  25672.3008  25667.3496  25671.3008
1  INDU:IND  2019-03-15T14:56:00  25658.4004  25667.3496  25658.4004  25666.3496
2  INDU:IND  2019-03-15T14:55:00  25658.4102  25659.4102  25656.4102  25659.4004
3  INDU:IND  2019-03-15T14:54:00  25655.4199  25659.4395  25652.4199  25657.4102
4  INDU:IND  2019-03-15T14:53:00  25662.4004  25663.4004  25652.4102  25654.4199
5  INDU:IND  2019-03-15T14:52:00  25660.3906  25662.3906  25657.3809  25661.4004
6  INDU:IND  2019-03-15T14:51:00  25662.3809  25662.3906  25655.3906  25659.3906
7  INDU:IND  2019-03-15T14:50:00  25658.4492  25662.3906  25656.4102  25661.3809
8  INDU:IND  2019-03-15T14:49:00  25653.4609  25653.4609  25647.4297  25648.4805
9  INDU:IND  2019-03-15T14:48:00  25657.4395  25658.4199  25650.4102  25654.4297
```

#**historicalMarketsChart**

An example of simple bar chart, with historical data from AAPL:US symbol and it's *Open, High, Low, Close* values for a specific date. 

The output will be:


![historicalMarketsChart](historicalMarketsChart.png)

#**streamingEx**

An example on how to get streaming data for markets in python

```python
import tradingeconomics as te
import json
te.login('guest:guest')

def on_message(ws, message):
  print json.loads(message)

te.subscribe('EURUSD:CUR')
te.run(on_message)
```