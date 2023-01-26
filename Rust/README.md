# Trading Economics Examples - Rust

Trading Economics provides its users with real time quotes, delayed feeds and historical data for currencies, commodities, stock indexes, share prices and bond yields. 

#

## Getting Started

  You will need to have Rust installed. You can get it by visiting https://rustup.rs. 
   * **Note:** Cargo is the package manager for Rust and it is installed when you install Rust on your system.
#

## Usage

1. ### Change client key:

* On each folder example the main script will be inside of /src
* In the main file you can change the client key in use. By default it is using our demo key.  
* **Note:** If you don't have a client key leave it as 'guest:guest' and a sample of data will be provided or you can get your free key here: http://developer.tradingeconomics.com 

2. ### Build the project
*  Enter on the main script path

```bash
cd tradingeconomics/Rust/News/src
```

* Run the build
* It will generate a new .exe file in target/debug folder

```bash
cargo build
```

3. Run the executable created with the build command

```bash 
cd /target/debug
./News.exe
```

### Output Example:

```bash 
$ ./News.exe
-----------------------Get the latest news----------------------
Array [
    Object {
        "category": String("Stock Market"),
        "country": String("Italy"),
        "date": String("2023-01-25T09:37:36.74"),
        "description": String("The FTSE MIB index hovered close to the flatline at the 25,880 mark on Wednesday, holding gains from the three prior sessions and remaining close to the 11-month high touched last week as investors digested a batch of economic data for hints on the ECB’s guidance this year. German business climate and Swiss investors’ sentiment both improved during January, while British and Spanish producer inflation retreated to multi-month lows in December, further downplaying recession risks. Banks hovered slightly in the green and held yesterday’s rally, despite the decline in domestic bond prices. In the meantime, Iveco Group stocks jumped by more than 4% after the manufacturer announced it secured an agreement to supply Belgium with 500 electric buses by 2026. On the other hand, energy and telecom shares were sharply in the red."),
        "id": String("365640"),
        "importance": Number(1),
        "symbol": String("FTSEMIB"),
        "title": String("Italian Shares Hover Flat on Wednesday"),
        "url": String("/italy/stock-market"),
    },
...

```

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx


