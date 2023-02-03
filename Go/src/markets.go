package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
	"strings"
)

var apikey = "guest:guest" 

func main() {

	MarketsSnapshot("commodities")
	MarketsHistorical("aapl:us")
	MarketIntraday("aapl:us","5d","2020-01-01%2000:00","2020-12-01%2015:30")
}

func MarketsSnapshot(marketType string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/markets/",marketType,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Markets Snapshot"), "\n")

	log.Println(string(body), "\n")

}

func MarketsHistorical(symbol string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/markets/historical/",symbol,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Markets Historical"), "\n")

	log.Println(string(body), "\n")

}


func MarketIntraday(symbol string, agr string, start string, end string) {
	resp, err := http.Get(fmt.Sprint("http://api.tradingeconomics.com/markets/intraday/",symbol,"?agr=",agr,"&d1=",strings.ReplaceAll(start, " ", "%20"),"&d2=",strings.ReplaceAll(end, " ", "%20"),"&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("MARKET INTRADAY"), "\n")

	log.Println(string(body), "\n")

}
