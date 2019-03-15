#Forecasts examples

In this folder you can find examples on how to get forecast data using python.
Remember that without a client key to login, only a sample of data will be provided.

#**forecastsEx**

Shows how to get data with diferent parameters, and output types.

*You can get a pandas DataFrame output:*
```python
               Country Category  LatestValue      LatestValueDate         ...                q3              q3_date       q4              q4_date
0          Afghanistan      GDP        20.82  2017-12-31T00:00:00         ...             22.00  2019-09-30T00:00:00    22.00  2019-12-31T00:00:00
1              Albania      GDP        13.04  2017-12-31T00:00:00         ...             14.50  2019-09-30T00:00:00    14.00  2019-12-31T00:00:00
2              Algeria      GDP       170.37  2017-12-31T00:00:00         ...            178.10  2019-09-30T00:00:00   178.10  2019-12-31T00:00:00
3              Andorra      GDP         3.01  2017-12-31T00:00:00         ...              3.15  2019-09-30T00:00:00     3.07  2019-12-31T00:00:00
4               Angola      GDP       124.21  2017-12-31T00:00:00         ...            143.00  2019-09-30T00:00:00   143.00  2019-12-31T00:00:00
5  Antigua And Barbuda      GDP         1.53  2017-12-31T00:00:00         ...              1.60  2019-09-30T00:00:00     1.60  2019-12-31T00:00:00
6            Argentina      GDP       637.59  2017-12-31T00:00:00         ...            680.00  2019-09-30T00:00:00   680.00  2019-12-31T00:00:00
7              Armenia      GDP        11.54  2017-12-31T00:00:00         ...             13.30  2019-09-30T00:00:00    13.30  2019-12-31T00:00:00
8                Aruba      GDP         2.58  2011-12-31T00:00:00         ...              2.70  2019-09-30T00:00:00     2.70  2019-12-31T00:00:00
9            Australia      GDP      1323.42  2017-12-31T00:00:00         ...           1580.00  2019-09-30T00:00:00  1580.00  2019-12-31T00:00:00

[10 rows x 15 columns]
```

*And a dictionary (dict) output:*
```python
{'United States': {'GDP': [{'LatestValue': 19390.6, 'LatestValueDate': '2017-12-31T00:00:00', 'YearEnd': 20220.0, 'YearEnd2': 20700.0, 'YearEnd3': 20700.0, 'q1': 20220.0, 'q1_date': '2019-03-31T00:00:00', 'q2': 20220.0, 'q2_date': '2019-06-30T00:00:00', 'q3': 20220.0, 'q3_date': '2019-09-30T00:00:00', 'q4': 20220.0, 'q4_date': '2019-12-31T00:00:00'}]}}
```

#**forecastsApp**

It's a simple App where you can use the data from forecasts and showing it on an html page.

It also gets the data into a *csv(comma-separated values)* file that you can read it in an *excel spreadsheet* for example.

The output of the csv file:

```python
Country,Category,LatestValue,LatestValueDate,YearEnd,YearEnd2,YearEnd3,q1,q1_date,q2,q2_date,q3,q3_date,q4,q4_date
India,Exports,26360.0,2019-01-31T00:00:00,30000.0,28900.0,28900.0,27962.19,2019-03-31T00:00:00,27452.67,2019-06-30T00:00:00,28018.71,2019-09-30T00:00:00,30000.0,2019-12-31T00:00:00
India,Imports,41090.0,2019-01-31T00:00:00,45900.0,43000.0,43000.0,43231.63,2019-03-31T00:00:00,43211.63,2019-06-30T00:00:00,43209.38,2019-09-30T00:00:00,45900.0,2019-12-31T00:00:00
United States,Exports,205116.0,2018-12-31T00:00:00,198000.0,206000.0,206000.0,207000.0,2019-03-31T00:00:00,213000.0,2019-06-30T00:00:00,213000.0,2019-09-30T00:00:00,198000.0,2019-12-31T00:00:00
United States,Imports,264885.0,2018-12-31T00:00:00,258000.0,259000.0,259000.0,259000.0,2019-03-31T00:00:00,257000.0,2019-06-30T00:00:00,269000.0,2019-09-30T00:00:00,258000.0,2019-12-31T00:00:00

```

This app is a webserver that you can access from your browser on the 5000 port.

```python
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
The output will be like this one, but you can custom your App as you want. 


![forecastsTable](forecastsTable.png)

