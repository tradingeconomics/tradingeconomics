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

	eurostatCategory("Poverty")
	eurostatId("24804")

}

func eurostatCategory(category string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/eurostat?category_group=",strings.ReplaceAll(category, " ", "%20"),"&c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Eurostat by category group"), "\n")

	log.Println(string(body), "\n")

}

func eurostatId(id string) {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/eurostat/historical/",id,"?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("Eurostat by ID"), "\n")

	log.Println(string(body), "\n")

}

