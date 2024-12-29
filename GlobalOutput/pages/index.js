import axios from "axios"
import Map from "../components/Map"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ticker from 'react-ticker'
import NumberFormat from 'react-number-format'
import { ResponsivePieCanvas } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

import {Component} from "react"

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedCountry: 'usa',
      selectedCurrency: 'usd',
      countryData:  {"id": "usa",
        "name": "usa",
        "lng": "-77.04410423472449",
        "lat": "38.9046802783378"
      },
      markerData: {},
      showingCorps: false,
      currentCorp: '',
      currentCorpProfile: {
        "symbol": "UNH",
        "price": 520.48,
        "beta": 0.591,
        "volAvg": 3762201,
        "mktCap": 478989416320,
        "lastDiv": 8.4,
        "range": "436.38-630.73",
        "changes": 4.72,
        "companyName": "UnitedHealth Group Incorporated",
        "currency": "USD",
        "cik": "0000731766",
        "isin": "US91324P1021",
        "cusip": "91324P102",
        "exchange": "New York Stock Exchange",
        "exchangeShortName": "NYSE",
        "industry": "Medical - Healthcare Plans",
        "website": "https://www.unitedhealthgroup.com",
        "description": "UnitedHealth Group Incorporated operates as a diversified health care company in the United States. It operates through four segments: UnitedHealthcare, Optum Health, Optum Insight, and Optum Rx. The UnitedHealthcare segment offers consumer-oriented health benefit plans and services for national employers, public sector employers, mid-sized employers, small businesses, and individuals; health care coverage and well-being services to individuals age 50 and older addressing their needs for preventive and acute health care services, as well as services dealing with chronic disease and other specialized issues for older individuals; Medicaid plans, children's health insurance and health care programs; health and dental benefits; and hospital and clinical services. The OptumHealth segment provides access to networks of care provider specialists, health management services, care delivery, consumer engagement, and financial services. This segment serves individuals directly through care delivery systems, employers, payers, and government entities. The OptumInsight segment offers software and information products, advisory consulting arrangements, and managed services outsourcing contracts to hospital systems, physicians, health plans, governments, life sciences companies, and other organizations. The OptumRx segment provides pharmacy care services and programs, including retail network contracting, home delivery, specialty and compounding pharmacy, and purchasing and clinical capabilities, as well as develops programs in the areas of step therapy, formulary management, drug adherence, and disease/drug therapy management. UnitedHealth Group Incorporated was incorporated in 1977 and is based in Minnetonka, Minnesota.",
        "ceo": "Sir Andrew Philip Witty",
        "sector": "Healthcare",
        "country": "US",
        "fullTimeEmployees": "440000",
        "phone": "952 936 1300",
        "address": "UnitedHealth Group Center",
        "city": "Minnetonka",
        "state": "MN",
        "zip": "55343",
        "dcfDiff": -345.16586,
        "dcf": 865.6458624115186,
        "image": "https://images.financialmodelingprep.com/symbol/UNH.png",
        "ipoDate": "1984-10-17",
        "defaultImage": false,
        "isEtf": false,
        "isActivelyTrading": true,
        "isAdr": false,
        "isFund": false
      },
      countryData: {lat: "38.9046802783378", lng: "-77.04410423472449"},
      products: [], 
      topProducts: [],
      currencies: [],
      slidingBasket: [],
      companies: [
        {
          'country':'usa',
          'currency': '',
          'megacorps': [`WMT`,`AMZN`,`AAPL`,`UNH`,`BRK-B`,`CVS`,`XOM`,`GOOGL`,`MCK`,`COR`]
        },
        {
          'country':'chn',
          'currency': '',
          'megacorps': [`TCEHY`,`PTR`,`IDCBY`,`BABA`,`CICHY`,`PNGAY`,`BIDU`,`JD`,`PDD`,`CIHKY`]
        },
        {
          'country':'jpn',
          'currency': '',
          'megacorps': [`TM`,`HMC`,`SONY`,`MC`,`MUFG`,`MFG`,`CJPRY`,`NMR`,`NSANF`,`ALPMY`]
        },
        {
          'country':'deu',
          'currency': 'eur',
          'megacorps': [`BAYRY`,`DTEGY`,`IMUX`,`DAI`,`DB`,`SAP`,`POAHY`,`VWAGY`,`HDELY`, `DHLGY`]
        },
        {
          'country':'ind',
          'currency': '',
          'megacorps': [`INFY`, `IBN`,`HDB`,`WIT`, `MMYT`, `RDY`, `WNS`, `SIFY`, `YTRA`, `ZCAR`]
        },
        {
          'country':'gbr',
          'currency': '',
          'megacorps': [`SHEL`,`BP`,`RIO`,`HSBC`,`LYG`,`ARM`,`VOD`,`AZN`,`BTI`,`DEO`,`LIN`,`UL`]
        },
        {
          'country':'fra',
          'currency': '',
          'megacorps': [`TTE`, `ORAN`, `SNY`, `CSTM`, `LRLCY`, `BNPQY`, `LVMUY`, `CRTO`, `DANOY`, `AXAHY`]
        },
        {
          'country':'ita',
          'currency': '',
          'megacorps': [`E`,`RACE`,`ZGN`,`STVN`,`UNCRY`,`ISNPY`,`PRDSY`,`PRYMY`,`TEZNY`,`ARZGY`]
        },
        {
          'country':'bra',
          'currency': '',
          'megacorps': [`PBR`,`ITUB`,`BBD`,`VALE`,`ABEV`,`GGB`,`VIV`,`SBS`,`ERJ`,`TIMB`]
        },
        {
          'country':'rus',
          'currency': '',
          'megacorps': [`ROSN`,`VTBR`,`FIVE`,`SGGD`,`MGNT`,`ATAD`,`NLMK`,`NVTK`,`MNOD`,`SVST`]
        }
      ], 
      stocks: [], 
      stockBasket: [], 
      nations: ['usa','chn','jpn','deu','ind','gbr','fra','ita','bra','rus'],
      counter: 0,
      autoCode: 0,
      pieSampleData: [
        {
          "id": "erlang",
          "label": "erlang",
          "value": 320,
          "color": "hsl(22, 70%, 50%)"
        },
        {
          "id": "php",
          "label": "php",
          "value": 256,
          "color": "hsl(69, 70%, 50%)"
        },
        {
          "id": "rust",
          "label": "rust",
          "value": 98,
          "color": "hsl(9, 70%, 50%)"
        },
        {
          "id": "stylus",
          "label": "stylus",
          "value": 575,
          "color": "hsl(256, 70%, 50%)"
        },
        {
          "id": "elixir",
          "label": "elixir",
          "value": 567,
          "color": "hsl(66, 70%, 50%)"
        },
        {
          "id": "css",
          "label": "css",
          "value": 477,
          "color": "hsl(207, 70%, 50%)"
        },
        {
          "id": "python",
          "label": "python",
          "value": 584,
          "color": "hsl(228, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 132,
          "color": "hsl(178, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 257,
          "color": "hsl(310, 70%, 50%)"
        },
        {
          "id": "javascript",
          "label": "javascript",
          "value": 437,
          "color": "hsl(287, 70%, 50%)"
        },
        {
          "id": "c",
          "label": "c",
          "value": 167,
          "color": "hsl(267, 70%, 50%)"
        },
        {
          "id": "lisp",
          "label": "lisp",
          "value": 446,
          "color": "hsl(191, 70%, 50%)"
        },
        {
          "id": "ruby",
          "label": "ruby",
          "value": 329,
          "color": "hsl(356, 70%, 50%)"
        },
        {
          "id": "scala",
          "label": "scala",
          "value": 437,
          "color": "hsl(58, 70%, 50%)"
        },
        {
          "id": "go",
          "label": "go",
          "value": 244,
          "color": "hsl(97, 70%, 50%)"
        },
        {
          "id": "make",
          "label": "make",
          "value": 136,
          "color": "hsl(251, 70%, 50%)"
        },
        {
          "id": "haskell",
          "label": "haskell",
          "value": 522,
          "color": "hsl(109, 70%, 50%)"
        },
        {
          "id": "java",
          "label": "java",
          "value": 168,
          "color": "hsl(20, 70%, 50%)"
        }
      ],
      barSampleData: [
        {
          "year": "2001",
          "Revenue": 92,
          "RevenueColor": "hsl(123, 70%, 50%)",
          "EBITDA": 6,
          "EBITDAColor": "hsl(44, 70%, 50%)",
          "Net Income": 19,
          "Net IncomeColor": "hsl(197, 70%, 50%)"
        },
        {
          "year": "2002",

          "Revenue": 92,
          "RevenueColor": "hsl(123, 70%, 50%)",

          "EBITDA": 6,
          "EBITDAColor": "hsl(44, 70%, 50%)",
          
          "Net Income": 19,
          "Net IncomeColor": "hsl(197, 70%, 50%)"
        },
        {
          "year": "2003",

          "Revenue": 92,
          "RevenueColor": "hsl(123, 70%, 50%)",

          "EBITDA": 6,
          "EBITDAColor": "hsl(44, 70%, 50%)",
          
          "Net Income": 19,
          "Net IncomeColor": "hsl(197, 70%, 50%)"
        },
        {
          "year": "2004",

          "Revenue": 92,
          "RevenueColor": "hsl(123, 70%, 50%)",

          "EBITDA": 6,
          "EBITDAColor": "hsl(44, 70%, 50%)",
          
          "Net Income": 19,
          "Net IncomeColor": "hsl(197, 70%, 50%)"
        },
        {
          "year": "2005",

          "Revenue": 92,
          "RevenueColor": "hsl(123, 70%, 50%)",

          "EBITDA": 6,
          "EBITDAColor": "hsl(44, 70%, 50%)",
          
          "Net Income": 19,
          "Net IncomeColor": "hsl(197, 70%, 50%)"
        }
      ],
      chartData: [],
      barChartTheme: {
          "background": "#FFF",
          "text": {
              "fontSize": 11,
              "fill": "#121C2B",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          },
          "axis": {
              "domain": {
                  "line": {
                      "stroke": "#121C2B",
                      "strokeWidth": 1
                  }
              },
              "legend": {
                  "text": {
                      "fontSize": 12,
                      "fill": "#121C2B",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              },
              "ticks": {
                  "line": {
                      "stroke": "#777777",
                      "strokeWidth": 1
                  },
                  "text": {
                      "fontSize": 11,
                      "fill": "#121C2B",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              }
          },
          "grid": {
              "line": {
                  "stroke": "#dddddd",
                  "strokeWidth": 1
              }
          },
          "legends": {
              "title": {
                  "text": {
                      "fontSize": 11,
                      "fill": "#121C2B",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              },
              "text": {
                  "fontSize": 11,
                  "fill": "#121C2B",
                  "outlineWidth": 0,
                  "outlineColor": "#121C2B"
              },
              "ticks": {
                  "line": {},
                  "text": {
                      "fontSize": 10,
                      "fill": "#121C2B",
                      "outlineWidth": 0,
                      "outlineColor": "transparent"
                  }
              }
          },
          "annotations": {
              "text": {
                  "fontSize": 13,
                  "fill": "#fff",
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "link": {
                  "stroke": "#000000",
                  "strokeWidth": 1,
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "outline": {
                  "stroke": "#000000",
                  "strokeWidth": 2,
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              },
              "symbol": {
                  "fill": "#000000",
                  "outlineWidth": 2,
                  "outlineColor": "#ffffff",
                  "outlineOpacity": 1
              }
          },
          "tooltip": {
              "wrapper": {},
              "container": {
                  "background": "#ffffff",
                  "color": "#333333",
                  "fontSize": 12
              },
              "basic": {},
              "chip": {},
              "table": {},
              "tableCell": {},
              "tableCellValue": {}
          }
      },
      incomeStatements: [],
      cashflowStatements: [],
      balanceSheets: [],
      statement: "Income Statement", 
      mapSize: "32vw",
      device: "desktop"
    }

    this.resizeMap = this.resizeMap.bind(this)

    this.pullData = this.pullData.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.pullExchanges = this.pullExchanges.bind(this)
    this.pushCurrencySlide = this.pushCurrencySlide.bind(this)
    
    this.pullCompanies = this.pullCompanies.bind(this)
    this.repopulateDB = this.repopulateDB.bind(this)

    this.loopSelection = this.loopSelection.bind(this)
    this.startAuto = this.startAuto.bind(this)
    this.displayCorps = this.displayCorps.bind(this)
    this.showFinancials = this.showFinancials.bind(this)
    this.selectStatement = this.selectStatement.bind(this)
  }

  async pullData(selectedCountry){
    axios.get(`/api/exports?country=${selectedCountry}`).then(res => {
      // console.log("Products \n",res.data)
      let products = res.data
      var totalExport = products.map(product => product.value).reduce((total, value) => total + value)
      var chartData = []
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const topProducts = products.slice(0,10)

      topProducts.map((product) => {  
        let value = (product.value/totalExport*100).toFixed(2)
        let name = product.cat_name
        let inMillion = USDollar.format(value)
        // console.log(inMillion)
        chartData.push({
          id: name, 
          value: value, 
          valueFormat: inMillion
        })
      })

      // const trigger = document.getElementById("trigger")
      // trigger.setAttribute("data-lat", this.state.countryData.lat)
      // trigger.setAttribute("data-lng", this.state.countryData.lng)
      // trigger.click()

      this.setState({
        products: products, 
        topProducts: chartData
      })
    })
  }

  async selectCountry(e){
    clearInterval(this.state.autoCode)

    console.log("SELECT COUNTRY ", e.target.value)
    let lng = e.target.options[e.target.selectedIndex].dataset.lng
    let lat = e.target.options[e.target.selectedIndex].dataset.lat

    console.log("Capital coordinate ",lng, lat)

    this.setState({
      selectedCountry: e.target.value,
      selectedCurrency: e.target.dataset.currency,
      countryData: {
        'id':e.target.value,
        'name': e.target.value,
        'lng': lng,
        'lat': lat
      }
    })

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()

    this.pullData(e.target.value)
    this.pullExchanges(e.target.options[e.target.selectedIndex].dataset.currency)
    this.pullCompanies(e.target.value)
    //this.repopulateDB(e.target.value)
  }

  async flyTo(event){
    const lng = event.target.dataset.lng
    const lat = event.target.dataset.lat

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()
  }

  async pullExchanges(baseCurrency){
    await axios.get(`/api/currencies?base=${baseCurrency}`).then(res => {
      // console.log("Currencies", res.data.data.eur)
      let currencyData = res.data.exchangeRate
      let selectedBasket = [`GBP`,`EUR`,`CAD`,`USD`,`JPY`,`KRW`,`CNY`,`MMK`,`VND`,`LAK`,`KHR`,`THB`,`AUD`,,`MXN`,'BRL','INR','RUB']
      let currencyBasket = []
      for (const key in currencyData) {
        // console.log(key, currencyData[key])
        if (selectedBasket.includes(key.toUpperCase())){
          currencyBasket.push({
            'name': key,
            'rate': currencyData[key]
          })
        }
      }

      let sortedBasket = currencyBasket.sort(
        (a, b) => {
          if (a.rate > b.rate) {
            return -1;
          } else if (a.rate < b.rate) {
            return 1;
          }
          return 0;
        }
      )

      let slidingBasket = []
      for(let i = 0; i < 10; i++){
        slidingBasket = slidingBasket.concat(sortedBasket)
      }

      this.setState({
        currencies: sortedBasket, 
        slidingBasket: slidingBasket
      })
    })
  }

  async pushCurrencySlide(){
     let currrentBasket = this.state.currencies
     // console.log(currrentBasket)
     this.setState({
       slidingBasket: this.state.slidingBasket.concat(currrentBasket)
     })
  }

  async pullCompanies(countryCode){
    let today = new Date().toLocaleDateString()

    // Pulling Stock Data by Country
    let stocks = await axios.get(`/api/get_stocks`)
      .then(res => {
        return res.data.stocks
          .filter(stock => stock.nation === this.state.selectedCountry)
      })

    // Updating Stock Data for Outdated data
    stocks = await Promise.all(stocks.map((stock) => {
        if (stock.timestamp !== today){
          console.log("PULLING DATA FOR ", today, stock.timestamp)
          let updated_stock = axios.get(`/api/companies?corps=${stock.symbol}`)
            .then(async(res) => {
              let fresh_stock = res.data.data[0]
              // console.log("Updated Stock", fresh_stock)

              let updated_stock = {
                'nation': this.state.selectedCountry,
                'timestamp': today,
                ...fresh_stock
              }

              await axios.post(`/api/update_stock?id=${stock.id}`, updated_stock)
                .then(res => {
                  console.log("Successfully updated stock ", res.data)
                  console.log(updated_stock)
                }
              )

              return updated_stock    
            })

          return updated_stock
          } else {
          // Update Stock in Database
          return stock
        }
      })
    )

    console.log("STOCKS ", stocks)

    // Create Stock Array for Sliding Row
    let stockBasket = []
    for(let i = 0; i < 10; i++){
      stockBasket = stockBasket.concat(stocks)
    }

    this.setState({
      stocks: stocks, 
      stockBasket: stockBasket
    })


    // axios.get(`/api/get_stocks`)
    //   .then(async(res) => {
    //     // console.log("All Stocks ",res.data.stocks)
    //     let stocks = res.data.stocks.filter(
    //       stock => stock.nation === this.state.selectedCountry
    //     )
    //     // console.log(`Stocks from ${this.state.selectedCountry} \n`, stocks)
    //     stocks = await stocks.map( async (stock) => {
    //         if (stock.timestamp !== today){
    //           console.log("PULLING DATA FOR ", today, stock.timestamp)
    //           let updated_stock = await axios.get(`/api/companies?corps=${stock.symbol}`)
    //             .then(async(res) => {
    //               let fresh_stock = res.data.data[0]
    //               // console.log("Updated Stock", fresh_stock)

    //               let updated_stock = {
    //                 'nation': this.state.selectedCountry,
    //                 'timestamp': today,
    //                 ...fresh_stock
    //               }

    //               await axios.post(`/api/update_stock?id=${stock.id}`, updated_stock)
    //                 .then(res => {
    //                   console.log("Successfully updated stock ", res.data)
    //                   console.log(updated_stock)
    //                 }
    //               )

    //               return updated_stock    
    //             })
    //           return updated_stock

    //         } else {
    //           // Update Stock in Database
    //           return stock
    //         }
    //     })

    //     console.log(
    //       "Updated Stocks ", 
    //       stocks
    //     )

        
    //   })
  }

  async repopulateDB(countryCode){
    let corps = this.state.companies.filter(company => company.country === countryCode)[0]['megacorps']
    let queryString = corps.join(",")
    console.log(queryString)

    axios.get(`/api/companies?corps=${queryString}`)
      .then(async(res) => {
        let stocks = res.data.data
        stocks = stocks.map(stock => {
          return {
            'nation': this.state.selectedCountry, 
            ...stock
          }
        })
        let stockBasket = []
        for(let i = 0; i < 10; i++){
          stockBasket = stockBasket.concat(stocks)
        }

        await axios.post(`/api/add_stock`, stocks)
          .then(res => {
            console.log("Stock Array",res)
          })

        this.setState({
          stocks: stocks, 
          stockBasket: stockBasket
        })
      })  
  }

  async loopSelection(){    
    let nations = this.state.nations
    let counter = this.state.counter
    let selectedNation = nations[counter]

    const selector = document.getElementById("country_selector")
    let value = selector.options[counter].value
    let lng = selector.options[counter].dataset.lng
    let lat = selector.options[counter].dataset.lat
    let currency = selector.options[counter].dataset.currency

    selector.selectedIndex = counter
    selector.dispatchEvent(new Event('change'))

    console.log("SELECT ",selectedNation, counter, value, lng, lat)

    const trigger = document.getElementById("trigger")
    trigger.setAttribute("data-lat", lat)
    trigger.setAttribute("data-lng", lng)
    trigger.click()

    this.pullData(selectedNation)
    this.pullCompanies(selectedNation)
    this.pullExchanges(currency)

    if (counter < 9){
      this.setState({
        counter: counter + 1
      })
    } else {
      this.setState({
        counter: 0
      })
    }
  }

  async startAuto(){
    let autoCode = setInterval(this.loopSelection, 8000)
    console.log("Interval CODE", autoCode)
    this.setState({
      autoCode: autoCode
    })
  }

  async displayCorps(event){
    clearInterval(this.state.autoCode)
    console.log("Target ", event.target.dataset.corp)

    let corpData = this.state.stocks
      .filter(stock => stock.symbol === event.target.dataset.corp)

    this.setState({
      showingCorps: true, 
      currentCorp: event.target.dataset.corp,
      currentCorpProfile: corpData[0]
    })

    this.corpHeadquarter(corpData[0])
    this.showFinancials(event.target.dataset.corp)
  }

  async corpHeadquarter(corpData){
    let corpAddress = corpData.address
    let corpCity = corpData.city
    let corpZipcode = corpData.zip
    let corpCountry = corpData.country

    let addressQuery = `${corpAddress} ${corpCity} ${corpCountry} ${corpZipcode}`

    console.log(addressQuery)

    await axios.post(
      `/api/address_suggestions`, 
      {'search':addressQuery}
    ).then(res => {
        let hqCoordinate = res.data.location[0].properties.coordinates

        this.setState({
          hqLng: hqCoordinate.longitude,
          hqLat: hqCoordinate.latitude
        })

        const trigger = document.getElementById("trigger")
        trigger.setAttribute("data-lat", hqCoordinate.latitude)
        trigger.setAttribute("data-lng", hqCoordinate.longitude)
        trigger.click()
      })
   }


  async showFinancials(corpSymbol){
    console.log("LOL ", corpSymbol)
    await axios.get(`/api/income_statement?corps=${corpSymbol}`)
      .then(res => {
        console.log(res.data)
        let incomeStatements = res.data.data

        let chartData = incomeStatements.map(statement => {
          console.log(statement)
          return {
            "year": statement.date,
            "Revenue": statement.revenue,
            "RevenueColor": "hsl(123, 70%, 50%)",
            "EBITDA": statement.ebitda,
            "EBITDAColor": "hsl(44, 70%, 50%)",
            "Net Income": statement.netIncome,
            "Net IncomeColor": "hsl(197, 70%, 50%)"
          }
        })

        this.setState({
          incomeStatements: incomeStatements,
          chartData: chartData
        })
      })

    await axios.get(`/api/cashflow_statement?corps=${corpSymbol}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          cashflowStatements: res.data.data
        })
      })

    await axios.get(`/api/balance_sheet?corps=${corpSymbol}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          balanceSheets: res.data.data
        })
      })
  }

  async selectStatement(event){

    let selectedStatement = event.target.dataset.statement
    this.setState({ statement: selectedStatement})

    if (selectedStatement === "Income Statement"){
      // console.log(selectedStatement)
      let incomeStatements = this.state.incomeStatements.map(statement => {
        console.log(statement)
        return {
          "year": statement.date.split("-")[0],
          "Revenue": statement.revenue,
          "RevenueColor": "hsl(59, 100%, 50%)",
          "EBITDA": statement.ebitda,
          "EBITDAColor": "hsl(0, 100%, 50%)",
          "Net Income": statement.netIncome,
          "Net IncomeColor": "hsl(256, 100%, 50%)"
        }
      })
      this.setState({
        chartData: incomeStatements
      })
      // incomeStatements
    } else if (selectedStatement === "Cashflow Statement"){
      console.log(selectedStatement)
      let cashflowStatements = this.state.cashflowStatements.map(statement => {
        console.log(statement)
        return {
          "year": statement.date.split("-")[0],
          "Account Receivables": statement.accountsReceivables,
          "Account ReceivablesColor": "hsl(123, 70%, 50%)",
          "Account Payables": statement.accountsPayables,
          "Account PayablesColor": "hsl(44, 70%, 50%)",
          "Capital Expenditure": statement.capitalExpenditure,
          "Capital ExpenditureColor": "hsl(197, 70%, 50%)",
          "Free Cashflow": statement.freeCashFlow,
          "Free CashflowColor": "hsl(197, 70%, 50%)"
        }
      })

      this.setState({
        chartData: cashflowStatements
      })
    } else if (selectedStatement === "Balance Sheet"){
      console.log("setting Chart Data for ", selectedStatement)
      let balanceSheets = this.state.balanceSheets.map(statement => {
        console.log(statement)
        return {
          "year": statement.date.split("-")[0],
          "Total Assets": statement.totalAssets,
          "Total AssetsColor": "hsl(123, 70%, 50%)",
          "Cash": statement.cashAndCashEquivalents,
          "CashColor": "hsl(44, 70%, 50%)",
          "Inventory": statement.inventory,
          "InventoryColor": "hsl(197, 70%, 50%)",
          "Shorterm Equity": statement.cashAndShortTermInvestments,
          "Shorterm EquityColor": "hsl(197, 70%, 50%)",
          "Shorterm Debt": statement.shortTermDebt,
          "Shorterm DebtColor": "hsl(197, 70%, 50%)",
          "Longterm Debt": statement.longTermDebt,
          "Longterm DebtColor": "hsl(197, 70%, 50%)"
        }
      })

      this.setState({
        chartData: balanceSheets
      })
    }
   
    // let statementData = this.state[event.target.dataset.statement]
    // console.log(statementData)
  }

  async resizeMap(){
    console.log("Device Width", window.innerWidth)
    if (window.innerWidth < 610){
      this.setState({
        mapSize: "90vw",
        device: "mobile"
      })
    } else {
      this.setState({
        mapSize: "32vw",
        device: "desktop"
      })
    }
  }

  componentWillMount(){
    clearInterval(this.state.autoCode)
  }

  componentDidMount(){
    this.resizeMap()
    this.pullData('usa')
    this.pullExchanges(this.state.selectedCurrency)
    // this.repopulateDB('usa')
    this.pullCompanies('usa')
    // this.startAuto()
  }

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.export}>
          {
            this.state.showingCorps
            ? <div className={styles.table}>
                <div className={styles.corpSummary}>
                  <div className={styles.pricing}>
                    <img 
                      className={styles.corpLogo}
                      src={this.state.currentCorpProfile.image}
                    />
                    <div className={styles.priceChanges}>
                      <span className={styles.triangleUp}></span>
                      {this.state.currentCorpProfile.changes}
                    </div>
                    <div className={styles.price}>
                      {this.state.currentCorpProfile.price}
                    </div>
                    <div className={styles.ticker}>
                      {this.state.currentCorpProfile.symbol}
                    </div>
                  </div>
                  
                  <div className={styles.info}>
                    <div className={styles.corpName}>
                      {this.state.currentCorpProfile.companyName}
                    </div>
                    <div className={styles.corpInfo}>
                      {this.state.currentCorpProfile.address}
                    </div>
                    <div className={styles.corpInfo}>
                      {this.state.currentCorpProfile.city}, {this.state.currentCorpProfile.state}, {this.state.currentCorpProfile.zip}
                    </div>
                    <div className={styles.corpInfo}>
                      {this.state.currentCorpProfile.phone}
                    </div>
                    <div className={styles.corpInfo}>
                      CEO: {this.state.currentCorpProfile.ceo}
                    </div>
                    <div className={styles.corpInfo}>
                      Employees: {this.state.currentCorpProfile.fullTimeEmployees}
                    </div>
                    <div className={styles.corpInfo}>
                      Sector: {this.state.currentCorpProfile.sector}
                    </div>
                    <div className={styles.corpInfo}>
                      Industry: {this.state.currentCorpProfile.industry}
                    </div>
                  </div>

                  <div className={styles.metrics}>
                    <div className={styles.exchange}>
                      {this.state.currentCorpProfile.exchangeShortName} {this.state.currentCorpProfile.exchange} 
                    </div>
                    <div className={styles.metricInfo}>
                      Beta Volatility: {this.state.currentCorpProfile.beta}
                    </div>
                    <div className={styles.metricInfo}>
                      Trading Volume: {this.state.currentCorpProfile.volAvg}
                    </div>
                    <div className={styles.metricInfo}>
                      Market Cap: {this.state.currentCorpProfile.mktCap}
                    </div>
                    <div className={styles.metricInfo}>
                      Last Dividend: {this.state.currentCorpProfile.lastDiv}
                    </div>
                    <div className={styles.metricInfo}>
                      Annual Range: {this.state.currentCorpProfile.range}
                    </div>
                  </div>
                </div>

                <strong> Description </strong>

                <div className={styles.description}>
                  {this.state.currentCorpProfile.description}
                </div>
              </div>

            : <div className={styles.table}>
                <div className={styles.tableName}>
                  <select 
                    className={styles.selection}
                    onChange={this.selectCountry}
                    id="country_selector"
                  >
                    <option 
                      value='usa'
                      data-lng="-77.04410423472449"
                      data-lat="38.9046802783378"
                      data-currency="USD"
                    > 
                      United States 
                    </option>
                    <option 
                      value='chn'
                      data-lng="116.40565993343536"
                      data-lat="39.90260546559617"
                      data-currency="CNY"
                    >
                      China 
                    </option>
                    <option 
                      value='jpn'
                      data-lng="139.7449267536858"
                      data-lat="35.677182219118635"
                      data-currency="JPY"
                    > Japan </option>
                    <option 
                      value='deu'
                      data-lng="13.41305121178803"
                      data-lat="52.51884772950167"
                      data-currency="EUR"
                    > Germany </option>

                    <option 
                      value='ind'
                      data-lng="77.19593602326063"
                      data-lat="28.518579319021935"
                      data-currency="INR"
                    > 
                      India 
                    </option>

                    <option 
                      value='gbr'
                      data-lng="-0.11465266233424798"
                      data-lat="51.502460331435785"
                      data-currency="GBP"
                    > 
                      United Kingdom 
                    </option>
                    <option 
                      value='fra'
                      data-lng="2.3511543507860155"
                      data-lat="48.857266311821164"
                      data-currency="EUR"
                    > 
                      France 
                    </option>

                    <option 
                      value='ita'
                      data-lng="12.489983230893142"
                      data-lat="41.90228734946103"
                      data-currency="EUR"
                    >
                      Italy 
                    </option>

                    <option 
                      value='bra'
                      data-lng="-47.88242930280692"
                      data-lat="-15.800832822859613"
                      data-currency="BRL"
                    >
                      Brazil
                    </option>

                    <option 
                      value='rus'
                      data-lng="37.67106783588022"
                      data-lat="55.7398329490853"
                      data-currency="RUB"
                    >
                      Russia 
                    </option>
                  </select>
                </div>

                <div className={styles.tableRow}>
                  <span className={styles.itemName}>
                    <strong>Annual Exports by Categories </strong>
                  </span>
                  <span className={styles.itemValue}>
                    <strong>Value</strong>
                  </span> 
                  <span className={styles.itemDate}>
                    <strong> Year </strong>
                  </span>
                </div>

                <div className={styles.tableData}>
                  {
                    this.state.products.map((product) => (
                      <div className={styles.tableRow} key={product.symbol}>
                        <span className={styles.itemName}>
                          {product.cat_name}
                        </span> 

                        <span className={styles.itemValue}>
                          <NumberFormat value={product.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </span>
                        <span className={styles.itemDate}> 
                          {product.date}
                        </span>
                      </div> 
                    ))
                  }
                </div>
              </div>
          }
          <div className={styles.rightPanel}>
            <div className={styles.map}>
              {
                this.state.showingCorps
                ? <Map 
                    width='{this.state.mapSize}'
                    height="38vh"
                    styles={styles.mapBox}
                    data={this.state.markerData}
                    zoom="10" 
                    lng={this.state.hqLng}
                    lat={this.state.hqLat}
                  />

                : <Map 
                    width={this.state.mapSize}
                    height="38vh"
                    data={this.state.countryData}
                    zoom="4" 
                    lat={this.state.countryData.lat}
                    lng={this.state.countryData.lng}
                  />
              }
            </div>

            <div className={styles.chart}>
              {
                this.state.showingCorps
                ? <div className={styles.financialStatements}>
                    <div className={styles.finStatePanel}>
                      {
                        this.state.statement === "Income Statement"
                        ? <strong 
                            className={styles.statementSelected}
                            onClick={this.selectStatement}
                            data-statement="Income Statement"
                          > 
                            Income Statements 
                          </strong >
                        : <strong 
                            className={styles.statement}
                            onClick={this.selectStatement}
                            data-statement="Income Statement"
                          > 
                            Income Statements 
                          </strong >
                      }
                      
                      {
                        this.state.statement === "Cashflow Statement"
                        ? <strong 
                            className={styles.statementSelected}
                            onClick={this.selectStatement}
                            data-statement="Cashflow Statement"
                          > 
                            Cashflow Statements 
                          </strong>
                        : <strong 
                            className={styles.statement}
                            onClick={this.selectStatement}
                            data-statement="Cashflow Statement"
                          > 
                            Cashflow Statements 
                          </strong>
                      }
                     
                      {
                        this.state.statement === "Balance Sheet"
                        ? <strong 
                            className={styles.statementSelected}
                            onClick={this.selectStatement}
                            data-statement="Balance Sheet"
                          > 
                            Balance Sheets 
                          </strong>
                        : <strong 
                            className={styles.statement}
                            onClick={this.selectStatement}
                            data-statement="Balance Sheet"
                          > 
                            Balance Sheets 
                          </strong>
                      }
                    </div>

                    {
                      this.state.statement === "Income Statement"
                      ? <div className={styles.finData}>
                          <div className={styles.finChart}>
                            <ResponsiveBar
                              data={this.state.chartData}
                              keys={[
                                  'Revenue',
                                  'EBITDA',
                                  'Net Income'
                              ]}
                              indexBy="year"
                              margin={{ top: 10, right: 130, bottom: 45, left: 20 }}
                              padding={0.2}
                              groupMode="grouped"
                              valueScale={{ type: 'linear' }}
                              indexScale={{ type: 'band', round: true }}
                              theme={this.state.barChartTheme}
                              colors={{ scheme: 'purple_orange' }}
                              defs={[
                                  {
                                      id: 'dots',
                                      type: 'patternDots',
                                      background: 'inherit',
                                      color: '#38bcb2',
                                      size: 4,
                                      padding: 1,
                                      stagger: true
                                  },
                                  {
                                      id: 'lines',
                                      type: 'patternLines',
                                      background: 'inherit',
                                      color: '#eed312',
                                      rotation: -45,
                                      lineWidth: 6,
                                      spacing: 10
                                  }
                              ]}
                              fill={[
                                  {
                                      match: {
                                          id: 'fries'
                                      },
                                      id: 'dots'
                                  },
                                  {
                                      match: {
                                          id: 'sandwich'
                                      },
                                      id: 'lines'
                                  }
                              ]}
                              borderWidth={1}
                              borderColor={{
                                  from: 'color',
                                  modifiers: [
                                      [
                                          'darker',
                                          '1.2'
                                      ]
                                  ]
                              }}
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Year',
                                  legendPosition: 'middle',
                                  legendOffset: 32,
                                  color: '#FFF',
                                  truncateTickAt: 0
                              }}
                              axisLeft={null}
                              enableLabel={false}
                              totalsOffset={9}
                              labelSkipWidth={4}
                              labelSkipHeight={12}
                              labelTextColor="#121C2B"
                              labelPosition="end"
                              labelOffset={10}
                              legends={[
                                  {
                                      dataFrom: 'keys',
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 120,
                                      translateY: 0,
                                      itemsSpacing: 2,
                                      itemWidth: 100,
                                      itemHeight: 20,
                                      itemDirection: 'left-to-right',
                                      itemOpacity: 0.85,
                                      symbolSize: 6,
                                      effects: [
                                          {
                                              on: 'hover',
                                              style: {
                                                  itemOpacity: 1
                                              }
                                          }
                                      ]
                                  }
                              ]}
                              role="application"
                              ariaLabel="Income Statement"
                              barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                            />
                          </div>
                          <div className={styles.finData}>
                            <div className={styles.incomeStatements}>
                              <div className={styles.incomeLabels}>
                                <div>Date</div>
                                <div>Revenue</div>
                                <div>EBITDA</div>
                                <div>Net Income</div>
                              </div>
                              {
                                this.state.incomeStatements.map(income => {
                                  return (
                                    <div className={styles.incomeChart}>
                                      <div>{income.date}</div>
                                      <div>{income.revenue}</div>
                                      <div>{income.ebitda}</div>
                                      <div>{income.netIncome}</div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div></div>
                          </div>
                        </div>
                      : <div></div>
                    }

                    {
                      this.state.statement === "Cashflow Statement"
                      ? <div className={styles.finData}>
                          <div className={styles.finChart}>
                            <ResponsiveBar
                              data={this.state.chartData}
                              keys={[
                                  'Account Receivables',
                                  'Account Payables',
                                  'Capital Expenditure',
                                  'Free Cashflow'
                              ]}
                              indexBy="year"
                              margin={{ top: 10, right: 130, bottom: 45, left: 20 }}
                              padding={0.2}
                              groupMode="grouped"
                              valueScale={{ type: 'linear' }}
                              indexScale={{ type: 'band', round: true }}
                              theme={this.state.barChartTheme}
                              colors={{ scheme: 'purple_orange' }}
                              defs={[
                                  {
                                      id: 'dots',
                                      type: 'patternDots',
                                      background: 'inherit',
                                      color: '#38bcb2',
                                      size: 4,
                                      padding: 1,
                                      stagger: true
                                  },
                                  {
                                      id: 'lines',
                                      type: 'patternLines',
                                      background: 'inherit',
                                      color: '#eed312',
                                      rotation: -45,
                                      lineWidth: 6,
                                      spacing: 10
                                  }
                              ]}
                              fill={[
                                  {
                                      match: {
                                          id: 'fries'
                                      },
                                      id: 'dots'
                                  },
                                  {
                                      match: {
                                          id: 'sandwich'
                                      },
                                      id: 'lines'
                                  }
                              ]}
                              borderWidth={1}
                              borderColor={{
                                  from: 'color',
                                  modifiers: [
                                      [
                                          'darker',
                                          '1.2'
                                      ]
                                  ]
                              }}
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Year',
                                  legendPosition: 'middle',
                                  legendOffset: 32,
                                  color: '#FFF',
                                  truncateTickAt: 0
                              }}
                              axisLeft={null}
                              enableLabel={false}
                              totalsOffset={9}
                              labelSkipWidth={4}
                              labelSkipHeight={12}
                              labelTextColor="#121C2B"
                              labelPosition="end"
                              labelOffset={10}
                              legends={[
                                  {
                                      dataFrom: 'keys',
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 120,
                                      translateY: 0,
                                      itemsSpacing: 2,
                                      itemWidth: 100,
                                      itemHeight: 20,
                                      itemDirection: 'left-to-right',
                                      itemOpacity: 0.85,
                                      symbolSize: 6,
                                      effects: [
                                          {
                                              on: 'hover',
                                              style: {
                                                  itemOpacity: 1
                                              }
                                          }
                                      ]
                                  }
                              ]}
                              role="application"
                              ariaLabel="Nivo bar chart demo"
                              barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                            />
                          </div>
                          <div className={styles.incomeStatements}>
                            <div className={styles.incomeLabels}>
                              <div>Date</div>
                              <div>Acc Receivables</div>
                              <div>Acc Payables</div>
                              <div>Cap Expenditure</div>
                              <div>Free Cashflow</div>
                            </div>
                            {
                              this.state.cashflowStatements.map(cashflow => {
                                return (
                                  <div className={styles.incomeChart}>
                                   <div>{cashflow.date}</div>
                                   <div>{cashflow.accountsReceivables}</div>
                                   <div>{cashflow.accountsPayables}</div>
                                   <div>{cashflow.capitalExpenditure}</div>
                                   <div>{cashflow.freeCashFlow}</div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      : <div></div>
                    }

                    {
                      this.state.statement === "Balance Sheet"
                      ? <div className={styles.finData}>
                          <div className={styles.finChart}>
                            <ResponsiveBar
                              data={this.state.chartData}
                              keys={[
                                  'Total Assets',
                                  'Cash',
                                  'Inventory',
                                  'Shorterm Equity',
                                  'Shorterm Debt',
                                  'Longterm Debt'
                              ]}
                              indexBy="year"
                              margin={{ top: 10, right: 130, bottom: 45, left: 20 }}
                              padding={0.2}
                              groupMode="grouped"
                              valueScale={{ type: 'linear' }}
                              indexScale={{ type: 'band', round: true }}
                              theme={this.state.barChartTheme}
                              colors={{ scheme: 'purple_orange' }}
                              defs={[
                                  {
                                      id: 'dots',
                                      type: 'patternDots',
                                      background: 'inherit',
                                      color: '#38bcb2',
                                      size: 4,
                                      padding: 1,
                                      stagger: true
                                  },
                                  {
                                      id: 'lines',
                                      type: 'patternLines',
                                      background: 'inherit',
                                      color: '#eed312',
                                      rotation: -45,
                                      lineWidth: 6,
                                      spacing: 10
                                  }
                              ]}
                              fill={[
                                  {
                                      match: {
                                          id: 'fries'
                                      },
                                      id: 'dots'
                                  },
                                  {
                                      match: {
                                          id: 'sandwich'
                                      },
                                      id: 'lines'
                                  }
                              ]}
                              borderWidth={1}
                              borderColor={{
                                  from: 'color',
                                  modifiers: [
                                      [
                                          'darker',
                                          '1.2'
                                      ]
                                  ]
                              }}
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Year',
                                  legendPosition: 'middle',
                                  legendOffset: 32,
                                  color: '#121C2B',
                                  truncateTickAt: 0
                              }}
                              axisLeft={null}
                              enableLabel={false}
                              totalsOffset={9}
                              labelSkipWidth={4}
                              labelSkipHeight={12}
                              labelTextColor="#121C2B"
                              labelPosition="end"
                              labelOffset={10}
                              legends={[
                                  {
                                      dataFrom: 'keys',
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 120,
                                      translateY: 0,
                                      itemsSpacing: 2,
                                      itemWidth: 100,
                                      itemHeight: 20,
                                      itemDirection: 'left-to-right',
                                      itemOpacity: 0.85,
                                      symbolSize: 6,
                                      effects: [
                                          {
                                              on: 'hover',
                                              style: {
                                                  itemOpacity: 1
                                              }
                                          }
                                      ]
                                  }
                              ]}
                              role="application"
                              ariaLabel="Nivo bar chart demo"
                              barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                            />
                          </div>
                          <div className={styles.incomeStatements}>
                            <div className={styles.incomeLabels}>
                              <div>Date</div>
                              <div>Total Assets</div>
                              <div>Cash</div>
                              <div>Inventory</div>
                              <div>Shorterm Equity</div>
                              <div>Shorterm Debt</div>
                              <div>Longterm Debt</div>
                            </div>
                            {
                              this.state.balanceSheets.map(balance => {
                                return (
                                  <div className={styles.incomeChart}>
                                    <div>{balance.date}</div>
                                    <div>{balance.totalAssets}</div>
                                    <div>{balance.cashAndCashEquivalents}</div>
                                    <div>{balance.inventory}</div>
                                    <div>{balance.cashAndShortTermInvestments}</div>
                                    <div>{balance.shortTermDebt}</div>
                                    <div>{balance.longTermDebt}</div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      : <div></div>
                    }
                  </div>  

                : <ResponsivePieCanvas
                    data={this.state.topProducts}
                    margin={{ top: 10, bottom: 10, right: 10,  left: 10 }}
                    innerRadius={0.2}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: 'spectral' }}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                    enableArcLinkLabels={false}
                    enableArcLabels={true}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#000"
                    arcLinkLabelsThickness={6}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsRadiusOffset={0.75}
                    arcLabelsTextColor="#121C2B"
                    arcLinkLabelsThickness={6}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'scala'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: 140,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 60,
                            itemHeight: 14,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 14,
                            symbolShape: 'circle'
                        }
                    ]}
                  />
              }
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <a href="/">
            <img 
              className={styles.logo}
              src="/TElogo.png"
            />
          </a>
          <div className={styles.floating}>
            <div className={styles.currencies}>
              <div className={styles.slideLeft}>
                {
                  this.state.slidingBasket
                    .map((currency) => {
                      let curr = currency.name.toUpperCase()
                      let rate = currency.rate.toFixed(2)
                      let color = '#'
                      return (
                        <div className={styles.currency}>
                          <span className={styles.symbol}>{curr}</span>
                          <span className={styles.rate}>{rate}</span>
                        </div>
                      )
                    }
                  )
                }
              </div>
            </div>

            <div className={styles.commodities}>
              <div className={styles.slideRight}>
                {
                  this.state.stockBasket.map((stock) => {
                    // console.log(stock)
                    if (stock){
                      let price = stock.price
                      let change = (stock.changes/stock.price * 100).toFixed(2)
                      return (
                        <div 
                          className={styles.stock}
                          onClick={this.displayCorps}
                          data-corp={stock.symbol}
                          href="/corp"
                        >
                          <span className={styles.stockSymbol}>{stock.symbol}</span>
                          <span className={styles.price}>{price}</span>
                          {
                            change < 0
                            ? <div className={styles.changeIndicator}>
                                <span className={styles.triangleDown}></span>
                                <span className={styles.negChange}>{change}%</span>
                              </div>
                            : <div className={styles.changeIndicator}>
                                <span className={styles.triangleUp}></span>
                                <span className={styles.posChange}>{change}%</span>
                              </div>
                          }
                        </div>
                      )
                    } else {
                      return (<div></div>)
                    }
                    
                  })
                }
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}