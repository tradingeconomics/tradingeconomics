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

	FinancialsCompanies("united states")
	FinancialHistorical("aapl:us:assets")
	FinancialsEarnings()
}

func FinancialsCompanies(country string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/financials/companies?country=",strings.ReplaceAll(country, " ", "%20"),"&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Country companies"), "\n")

	log.Println(string(body), "\n")

}

func FinancialHistorical(symbol string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/financials/historical/",symbol,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Financial Historical"), "\n")

	log.Println(string(body), "\n")

}

func FinancialsEarnings() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/earnings-revenues?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Earnings and Revenues"), "\n")

	log.Println(string(body), "\n")

}



