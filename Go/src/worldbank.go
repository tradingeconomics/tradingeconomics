package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
)

var apikey = "guest:guest" 

func main() {

	worldbankSnapshot()
	worldbankHistorical("usa.fr.inr.rinr")

}

func worldbankSnapshot() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/worldBank/categories?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Worldbank Snapshot"), "\n")

	log.Println(string(body), "\n")

}

func worldbankHistorical(seriescode string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/worldBank/historical?s=",seriescode,"&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Worldbank Historical"), "\n")

	log.Println(string(body), "\n")

}

