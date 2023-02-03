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

	search("japan", "markets")

}

func search(term string, category string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/search/",strings.ReplaceAll(term, " ", "%20"),"?category=",strings.ReplaceAll(category, " ", "%20"),"&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Search"), "\n")

	log.Println(string(body), "\n")

}

