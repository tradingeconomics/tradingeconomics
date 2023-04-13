package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
)

var apikey = "guest:guest" 

func main() {

	MakeCalendarRequest()
	MakeCalendarCountryRequest()
	MakeCalendarIndicatorRequest()
	MakeCalendarCountryIndicatorRequest()
	MakeCalendarIdRequest()
}

func MakeCalendarRequest() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/calendar?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("-----------------------CALENDAR EVENTS----------------------"), "\n")

	log.Println(string(body), "\n")

}
func MakeCalendarCountryRequest() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/calendar/country/united%20states?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("-------------------CALENDAR BY COUNTRY => 'UNITED STATES'------------------"), "\n")
	log.Println(string(body), "\n")

}

func MakeCalendarIndicatorRequest() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/calendar/indicator/inflation%20rate/2016-03-01/2016-03-03?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("-------------------CALENDAR BY INDICATORS AND DATES =>'INFLATION RATE'------------------"), "\n")
	log.Println(string(body), "\n")

}

func MakeCalendarCountryIndicatorRequest() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/calendar/country/united%20states/indicator/initial%20jobless%20claims/2016-12-01/2017-02-25?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("-------------------CALENDAR BY COUNTRY, INDICATOR AND DATES => 'UNITED STATES, INITIAL JOBLESS CLAIMS'------------------"), "\n")
	log.Println(string(body), "\n")

}
func MakeCalendarIdRequest() {
	resp, err := http.Get(fmt.Sprint("https://api.tradingeconomics.com/calendar/calendarid/174108,160025,160030?c=", apikey))

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println(string("-------------------CALENDAR BY ID=> '174108,160025,160030'------------------"), "\n")
	log.Println(string(body), "\n")

}
