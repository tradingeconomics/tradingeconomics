#  Trading Economics API Change Log


### *Latest changes, improvements and bug fixes on the API:*

+ 2023/02

    + __Added:__ Unit column to /forecast for indicators endpoints.

---

+ 2023/01

    + __Added:__ /calendar/group endpoints.
    + __Fixed:__ /forecasts by country and indicator changing orders.
    + __Added:__ StartDate column to /comtrade snapshot endpoints.

---

+ 2022/12

    + __Added:__ /financials/historical endpoint now supports multiple symbols.
    + __Added:__ d1 to d2 capability for /financials/historical endpoint.
    + __Fixed:__ /eurostat/historical in csv format not showing column names.

---

+ 2022/11

    + __Added:__ /earnings-revenues endpoints.
    + __Added:__ FirstValueDate column to Indicators endpoints.
    + __Added:__ Frequency column to Financials snapshot.
    + __Added:__ /financials/categories and /financials/category/{category} endpoints.

---

+ 2022/10

    + __Fixed:__ /markets/crypto not showing all cryptos.

---

+ 2022/09

    + __Fixed:__ List of States on Fred showing null and duplicate record.

---

+ 2022/06

    + __Added:__ StartDate column on markets/category endpoints.

---

+ 2022/05

    + __Added:__ /markets/symbology endpoint for stocks.
    + __Added:__ /calendar/updates endpoint.
    + __Added:__ /historical/updates endpoint.
  
---

+ 2022/03

    + __Added:__ /markets/crypto endpoint.
    + __Added:__ /markets/forecasts/crypto endpoint.
  
---
+ 2021/11

    + __Added:__ Title field on /descriptions endpoint.
    + __Added:__ markets/stockdescriptions endpoint.
    + __Added:__ unit column to markets/symbol endpoint.
  
---
+ 2021/10

    + __Added:__ Importance field on /earnings endpoint.
    + __Added:__ Filter updates by time on /updates endpoint.
    + __Added:__ Peers endpoint for indicators.
---
+ 2021/09

    + __Fixed:__ Calls to calendar/country/indicator with no dates chosen were only getting the next 7 days, now it will go back the top limit rows by calendar role and also adds the 7 days forward, fixing the blank page with no data presented.
    + __Deprecated:__ Columns "OCountry" and "OCategory" were removed from regular calendar calls.
    + __Changed:__ calendar to get the new limits on rows by role for calendar translation.
    + __Added:__ New column "OEvent" when in translated calendar queries.
    + __Added:__ Filter by dates on the /news endpoint.
---
+ 2021/07

    + __Changed:__ markets/country role limitation, had a restraint of 250 rows per page.
    + __Deprecated:__ pagination on markets/country.
    + __Fixed:__ markets/historical and intraday row limitation was not according to the rows a role could get.
    + __Changed:__ calendar to get the new limits on rows by role.
    + __Added:__ Source URL column to indicators and calendar endpoints.
---
+ 2021/06

    + __Added:__ filter by country and category on descriptions.
    + __Added:__ Command Timeouts to Comtrade, Eurostat, Fred and WorldBank databases.
---
+ 2021/05

    + __Fixed:__ financials/historical showing category number instead of ID.
    + __Fixed:__ financials/historical role limitation had a bug for guest users.
    + __Fixed:__ "OCountry" and "OCategory" for calendar translation, giving the original language and category instead of the translated ones.
    + __Changed:__ improvements on speed for calendar translation queries.
---
+ 2021/04

    + __Added:__ all indicators descriptions that are listed on the website.
---
+ 2021/01

    + __Added:__ possibility to choose a date range on fred/historical endpoint.
---
+ 2020/12

    + __Added:__ Eurostat database endpoints, to get statistical information for the European Union.
---
+ 2019/07

    + __Added:__ Financials endpoint, to get fundamentals data for stocks.
---

+ 2018/02

    + __Added:__ FRED database endpoints, to get Federal Reserve data.
---
+ 2017/12

    + __Added:__ WorldBank database endpoints, to get development indicators data.
    + __Added:__ Comtrade database endpoints, to get trade data.
---
+ 2015/07

    + __Added:__ Streaming service for the Economic Calendar and Markets.
---
+ 2014/08

    + __Added:__ Translation for multiple languages on the Calendar endpoint.
---
### *Packages latest versions:*
Package | Version
:---: |:---:
*Python* |`3.9` 
*Node* | `2.2.1`
*R* | `0.2.12`




