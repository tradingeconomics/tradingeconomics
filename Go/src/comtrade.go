package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
)

var apikey = "guest:guest" 

func main() {

	comtradeUpdates()
	comtradeHistorical("PRTESP24031")

}

func comtradeUpdates() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/comtrade/updates?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Comtrade Updates"), "\n")

	log.Println(string(body), "\n")

}

func comtradeHistorical(symbol string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/comtrade/historical/",symbol,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Comtrade Historical"), "\n")

	log.Println(string(body), "\n")

}

