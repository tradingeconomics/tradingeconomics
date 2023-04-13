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

	ForecastCountry("mexico")
	ForecastMarkets("index") //can be index, crypto, commodity, bond or currency
}

func ForecastCountry(country string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/forecast/country/",strings.ReplaceAll(country, " ", "%20"),"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Forecast by Country"), "\n")

	log.Println(string(body), "\n")

}

func ForecastMarkets(market string) {
	resp, err := http.Get(fmt.Sprint("http://api.tradingeconomics.com/markets/forecasts/",market,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Forecast Markets"), "\n")

	log.Println(string(body), "\n")

}



