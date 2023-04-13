package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
)

var apikey = "guest:guest" 

func main() {

	fedSnapshot()
	fedHistorical("RACEDISPARITY005007")

}

func fedSnapshot() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/fred/states?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Federal States Snapshot"), "\n")

	log.Println(string(body), "\n")

}

func fedHistorical(id string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/fred/historical/",id,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Federal Historical"), "\n")

	log.Println(string(body), "\n")

}

