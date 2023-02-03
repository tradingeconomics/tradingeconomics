## Trading Economics Examples for Go


The Trading Economics Application Programming Interface (API) provides direct access to our data. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. 

#### <strong>Note:</strong> If you don't have a client key a sample of data will be provided or you can get your free key here:
[https://developer.tradingeconomics.com](https://developer.tradingeconomics.com)


#

## Usage

1. [Install Go](https://golang.org/doc/install)
2. Clone tradingeconomics repo
```bash
git clone https://github.com/tradingeconomics/tradingeconomics.git
cd tradingeconomics/Go
```
3. Run the examples 
    - Run directly from tradingeconomics go folder
        ```bash
          go run src/calendar.go
        ``` 
    - Run from GOPATH
        - Copy the examples to:  C:\Go
        - go run src/calendar.go

4. Build example:
    ```go
      C:\Go\src>go build calendar.go
    ```

      Then you just need to type

      ```go
      C:\Go\src> calendar
      ```
      It will run the calendar.go file

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx