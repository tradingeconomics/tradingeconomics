package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
)

var apikey = "guest:guest" 

func main() {

	IndicatorCountryGroup("mexico","gdp")
	IndicatorHistorical("mexico","gdp","2015-01-01","2015-12-31")
}

func IndicatorCountryGroup(country string, group string) {
	resp, err := http.Get(fmt.Sprint("http://api.tradingeconomics.com/country/",country,"?group=",group,"&f=json&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("INDICATOR BY COUNTRY AND GROUP"), "\n")

	log.Println(string(body), "\n")

}


func IndicatorHistorical(country string, indicator string, start string, end string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/historical/country/",country,"/indicator/",indicator,"/",start,"/",end,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("INDICATOR HISTORICAL"), "\n")

	log.Println(string(body), "\n")

}
