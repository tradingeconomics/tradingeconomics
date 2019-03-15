#Calendar examples

In this folder you can find examples on how to get data from calendar using python.
Remember that without a client key to login, only a sample of data will be provided.

#**calendarEx**

Shows how to get data with diferent parameters, and output types.

*You can get a pandas DataFrame output:*
```python
  CalendarId                 Date        Country    ...     Forecast TEForecast Importance
0      87213  2016-12-01T13:30:00  United States    ...         253K     253.1K          2
1      87229  2016-12-08T13:30:00  United States    ...         258K       263K          2
2      87240  2016-12-15T13:30:00  United States    ...         255K       256K          2
3      87249  2016-12-22T13:30:00  United States    ...         256K       256K          2
4      87260  2016-12-29T13:30:00  United States    ...         264K       271K          2
5     144647  2017-01-05T13:30:00  United States    ...         240K       264K          2
6     144663  2017-01-12T13:30:00  United States    ...         245K       244K          2
7     144673  2017-01-19T13:30:00  United States    ...          240       247K          2
8     144683  2017-01-26T13:30:00  United States    ...         247K       247K          2
9     144694  2017-02-02T13:30:00  United States    ...         250K       247K          2

[10 rows x 13 columns]
```

*And a dictionary (dict) output:*
```python
{'United States': {'Initial Jobless Claims': [{'CalendarId': '87213', 'Date': '2016-12-01T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Nov/26', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '268K', 'Previous': '251K', 'Forecast': '253K', 'TEForecast': '253.1K', 'Importance': 2}, {'CalendarId': '87229', 'Date': '2016-12-08T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Dec/03', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '258K', 'Previous': '268K', 'Forecast': '258K', 'TEForecast': '263K', 'Importance': 2}, {'CalendarId': '87240', 'Date': '2016-12-15T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Dec/10', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '254K', 'Previous': '258K', 'Forecast': '255K', 'TEForecast': '256K', 'Importance': 2}, {'CalendarId': '87249', 'Date': '2016-12-22T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Dec/17', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '275K', 'Previous': '254K', 'Forecast': '256K', 'TEForecast': '256K', 'Importance': 2}, {'CalendarId': '87260', 'Date': '2016-12-29T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Dec/24', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '265K', 'Previous': '275K', 'Forecast': '264K', 'TEForecast': '271K', 'Importance': 2}, {'CalendarId': '144647', 'Date': '2017-01-05T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Dec/31', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '235K', 'Previous': '263K', 'Forecast': '240K', 'TEForecast': '264K', 'Importance': 2}, {'CalendarId': '144663', 'Date': '2017-01-12T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Jan/07', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '247K', 'Previous': '237K', 'Forecast': '245K', 'TEForecast': '244K', 'Importance': 2}, {'CalendarId': '144673', 'Date': '2017-01-19T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Jan/14', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '234K', 'Previous': '249K', 'Forecast': '240', 'TEForecast': '247K', 'Importance': 2}, {'CalendarId': '144683', 'Date': '2017-01-26T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Jan/21', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '259K', 'Previous': '237K', 'Forecast': '247K', 'TEForecast': '247K', 'Importance': 2}, {'CalendarId': '144694', 'Date': '2017-02-02T13:30:00', 'Event': 'Initial Jobless Claims', 'Reference': 'Jan/28', 'Unit': '', 'Source': 'U.S. Department of Labor', 'Actual': '246K', 'Previous': '260K', 'Forecast': '250K', 'TEForecast': '247K', 'Importance': 2}]}}
```

#**calendarApp**

It's a simple App where you can use the data from the calendar by showing it on an html page.

It also gets the data into a *csv(comma-separated values)* file that you can read it in an *excel spreadsheet* for example.

The output of the csv file:

```python
CalendarId,Date,Country,Category,Event,Reference,Unit,Source,Actual,Previous,Forecast,TEForecast,Importance
87213,2016-12-01T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Nov/26,,U.S. Department of Labor,268K,251K,253K,253.1K,2
87229,2016-12-08T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Dec/03,,U.S. Department of Labor,258K,268K,258K,263K,2
87240,2016-12-15T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Dec/10,,U.S. Department of Labor,254K,258K,255K,256K,2
87249,2016-12-22T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Dec/17,,U.S. Department of Labor,275K,254K,256K,256K,2
87260,2016-12-29T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Dec/24,,U.S. Department of Labor,265K,275K,264K,271K,2
144647,2017-01-05T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Dec/31,,U.S. Department of Labor,235K,263K,240K,264K,2
144663,2017-01-12T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Jan/07,,U.S. Department of Labor,247K,237K,245K,244K,2
144673,2017-01-19T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Jan/14,,U.S. Department of Labor,234K,249K,240,247K,2
144683,2017-01-26T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Jan/21,,U.S. Department of Labor,259K,237K,247K,247K,2
144694,2017-02-02T13:30:00,United States,Initial Jobless Claims,Initial Jobless Claims,Jan/28,,U.S. Department of Labor,246K,260K,250K,247K,2
```

This app is a webserver that you can access from your browser on the 5000 port.

```python
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
The output will be:


![htmlTable](htmlTable.png)

#**streamingEx**

An example on how to get streaming data for the calendar in python

```python
te.login('guest:guest')
te.subscribe('calendar')

def on_message(ws, message):
    data = json.loads(message)
    print data

te.run(on_message)
```