  source("R/functions.R")


  #'Return indicators information from Trading Economics API
  #'@export getIndicatorData
  #'
  #'@param country string or list.
  #'String for one country information. List of strings for
  #'several countrys, for example country = c('country_name', 'country_name').
  #'@param indicator string or list.
  #'String for one indicator. List of strings for several indicators, for example
  #'indicators = 'indicator_name' or
  #'indicators = c('indicator_name', 'indicator_name').
  #'@param ticker string or list.
  #'String for one ticker information. List of strings for
  #'several tickers, for example ticker = c('ticker_name', 'ticker_name').
  #'@param group string or list.
  #'String for one group.
  #'@param outType string.
  #''lst'(default) for lis format output, 'df' for data frame,
  #'
  #'@return Return a list or dictionary of all indicators, indicators by country or country-indicator pair.
  #'@section Notes:
  #'All parameters are optional. Without parameters a list of all indicators will be provided.
  #'Without credentials default information will be provided.
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
  #'@examples
  #'\dontrun{ getIndicatorData(country = 'United States', indicator = 'Imports', outType = 'df')
  #'getIndicatorData(country = c('United States', 'china'), indicator = c('gdp','inflation rate'))
  #'getIndicatorData(country = 'United States', outType = 'df')
  #'}


  getIndicatorData <- function(country = NULL, indicator = NULL, outType = NULL, ticker = NULL, group = NULL){
    base <- "https://api.tradingeconomics.com/"
    df_final = data.frame()
    apikey_local <- .GlobalEnv$apiKey
      if (length(country) > 1){
        country = paste(country, collapse = ',')
      }
      if (length(indicator) > 1){
        indicator = paste(indicator, collapse = ',')
      }
      if (length(ticker) > 1){
        ticker = paste(ticker, collapse = ',')
      }

      if (is.null(country) & is.null(indicator) & is.null(ticker)){
        url <- 'indicators'
      }
      else if (is.null(country) & !is.null(indicator)){
        url <- paste('country', 'all', indicator, sep = '/')
      }
      else if (!is.null(country) & is.null(indicator) & is.null(group)){
        url <- paste('country', country, sep = '/')
      }
      else if (!is.null(country) & !is.null(indicator)){
        url <- paste('country', country, indicator, sep = '/')
      }
      else if (!is.null(country) & !is.null(group)){
        url <- paste('country', country, paste('?c=', apikey_local, '&group=', group, sep = ''), sep = '/')
      }
      else if (!is.null(ticker)){
        url <- paste('country', 'ticker', ticker, sep = '/')
      }

      if(is.null(group)){
        url <- paste(url, '?c=', apikey_local, sep = '')
      }
      url <- paste(base, url, sep = '')

      url <- URLencode(url)

      request <- GET(url)

      checkRequestStatus(http_status(request)$message)

      webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
      df_final = rbind(df_final, webResults)
      Sys.sleep(0.5)

        if (is.null(outType)| identical(outType, 'lst')){
          df_final <- split(df_final , f = paste(df_final$Country,df_final$Category))
        } else if (identical(outType, 'df')){
          df_final = df_final
        } else {
          stop('output_type options : df for data frame, lst(default) for list by country ')
        }

    return(df_final)
  }

  #'Return the latest updates
  #'@export getLatestUpdates
  #'
  #'@param country string.
  #'@param time string.
  #'@param outType string.
  #''lst'(default) for lis format output, 'df' for data frame,
  #'@param initDate string
  #'String for historical data lastupdate, or for historical data per date.
  #'@section Notes:
  #'Historical data Symbol lastupdates.
  #'
  #'@return Return a list or data frame of historical information by lastupdate or by specific date.
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
  #'@examples
  #'\dontrun{getLatestUpdates()
  #'getLatestUpdates(initDate = '2018-02-22')
  #'getLatestUpdates(country = 'united states')
  #'getLatestUpdates(initDate = '2021-10-22', time = '15:20')  
  #'}
  #'

  getLatestUpdates <- function(initDate= NULL, outType = NULL, country = NULL, time = NULL){
    base <-  "https://api.tradingeconomics.com/updates/"
    df_final = data.frame()
    url = ''
    apikey_local <- .GlobalEnv$apiKey
    if (length(country) > 1){
        country = paste(country, collapse = ',')
      }

    if(!is.null(initDate) & !is.null(country)){
      url <- paste('country', country, paste(initDate, collapse = ','), sep = '/')
    }
    else if(!is.null(initDate) ){
      url <- paste(paste(initDate, collapse = ','), sep = '/')
    }
    else if(!is.null(country)){
      url <- paste('country', country, sep = '/')
    }

    url <- paste(base, url, '?c=', apikey_local, sep = '')
    
    if(is.null(country) & !is.null(initDate) & !is.null(time)){
      if(is.na(hms::parse_hm(time))){
        print('Insert a valid time')
        stop()
      }else{
        url <- paste(url,'&time=',time,sep='')
      } 
    }

    
    url <- URLencode(url)
    request <- GET(url)

    checkRequestStatus(http_status(request)$message)

    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)

    return(df_final)
  }




  #'Returns List of Financials Discontinued Indicators by country name from Trading Economics API
  #'@export getDiscontinuedIndicators
  #'
  #'@param country string or list.
  #'String to get data for one country List of strings to get data for more than one country

  #'@param outType string.
  #''df' for data frame,
  #''lst'(default) for list.
  #'
  #'@return Returns List of Financials Discontinued Indicators by country name.
  #'@section Notes:
  #'Without credentials only sample data will be provided.
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
  #'@examples
  #'\dontrun{
  #'getDiscontinuedIndicators(country =c("united states","china"), outType = 'df')
  #' }
  #'

  getDiscontinuedIndicators <- function(country = NULL, outType = NULL){
    # Final string for the request data
    data_request_url <- ""

    #to get global 'apikey' to local function
    apikey_local <- .GlobalEnv$apiKey

    # Variables used to create the final string url
    url_base_tag <- "https://api.tradingeconomics.com/country"
    country_tag <- "/all"
    discontinuated_tag <- "/discontinued"
    key_tag <- paste('?c=',apikey_local, sep = '')

    df_final = data.frame()

    if(!is.null(country)){
      if (length(country) > 1){
        country = paste(country, collapse = ',')
      }
      country_tag <- paste('/', country, sep = '')
    }

    data_request_url <- paste(url_base_tag,country_tag,discontinuated_tag,key_tag, sep = '')
    print(data_request_url)



    data_request_url <- URLencode(data_request_url)

    request <- GET(data_request_url)

    checkRequestStatus(http_status(request)$message)


    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)

    if (is.null(outType)| identical(outType, 'lst')){
      df_final <- split(df_final , f =  paste(df_final$Country))


    } else if (identical(outType, 'df')){
      if (length(df_final) == 0){
        print ("No data provided for selected parameters")

      }else{
        return(df_final)

      }
    } else {
      stop('output_type options : df for data frame, lst(default) for list by country or symbol')
    }


    return(df_final)
  }

  #'Return indicators peers information from Trading Economics API
  #'@export getPeers
  #'@param country string
  #'@param ticker string
  #'@param category string
  #'@param outType string.
  #''lst'(default) for lis format output, 'df' for data frame,
  #'
  #'@section Notes:
  #'Without credentials default information will be provided.
  #'
  #'@return Return a list or data frame of peers information for specific country, ticker or category.
  #'
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
  #'@examples
  #'\dontrun{getPeers(ticker ='CPI YOY', outType = 'df')
  #'getPeers(country ='united states', outType = 'df')
  #'getPeers(country ='united states', category ='money', outType = 'df')}


  getPeers <- function(country = NULL, ticker = NULL, category = NULL, outType = NULL){
    
    base <- "https://api.tradingeconomics.com/peers/"
    df_final = data.frame()
    url = ''
    
    
    if (!is.null(country) & is.null(ticker)){
      if(is.null(category)){
        url <- paste('country', country, sep = '/')
      }
      else{
        url <- paste('country', country, category, sep = '/')
      }
    }
    
    if (is.null(country) & !is.null(ticker) & is.null(category)){
      url <- paste(ticker, sep = '/')
    }



  apikey_local <- .GlobalEnv$apiKey
  url <- paste(base, url, '?c=', apikey_local, sep = '')
  url <- URLencode(url)



  request <- GET(url)

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$Country))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)

  }

  #'Return indicators information from Trading Economics API
  #'@export getAllCountries
  #'
  #'@return Return a list or dictionary of all countries
  #'@section Notes:
  #'Without credentials default information will be provided.
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
  #'@examples
  #'getAllCountries()
  #'}


  getAllCountries <- function(outType = NULL){
    base <- "https://api.tradingeconomics.com/country"
    df_final = data.frame()
    apikey_local <- .GlobalEnv$apiKey

    url <- paste(base, '?c=', apikey_local, sep = '')

    request <- GET(url)

    checkRequestStatus(http_status(request)$message)

    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)

    if (is.null(outType)| identical(outType, 'lst')){
      df_final <- split(df_final , f = paste(df_final$Country))
    } else if (identical(outType, 'df')){
      df_final = df_final
    } else {
      stop('output_type options : df for data frame, lst(default) for list by country ')
    }

    return(df_final)
  }