#  Trading Economics API Change Log
### *Packages latest versions:*
Package | Version
:---: |:---:
*Python* |`0.2.980` 
*Node* | `1.0.7`
*R* | `0.2.3`

### *Latest changes, improvments and bug fixes on the API:*
+ 2021/07

    + __Changed:__ markets/country role limitation, had a restraint of 250 rows.
    + __Deprecated:__ pagination on markets/country.
---
+ 2021/06

    + __Added:__ filter by country and category on descriptions.
    + __Added:__ Command Timeouts to Comtrade, Eurostat, Fred and WB databases.
---
+ 2021/05

    + __Fixed:__ financials/historical showing category number instead of ID.
    + __Fixed:__ financials/historical role limitation.
    + __Fixed:__ "OCountry" and "OCategory" for calendar translation, giving the original language and category and not the translated ones.
    + __Changed:__ improvements on speed for calendar translation queries.
---
+ 2021/04

    + __Added:__ all descriptions on the website.
---
+ 2021/01

    + __Added:__ date range to fred/historical.





