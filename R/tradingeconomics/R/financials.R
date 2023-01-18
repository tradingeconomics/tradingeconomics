
source("R/functions.R")

#'Return Financials historical data by stock symbol from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'
#'@export getHistoricalFinancialsData
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for more than one symbol.
#'@param category string.
#'String to get data for one indicator.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of Financials historical data by stock symbol.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getHistoricalFinancialData(symbol = 'aapl:us', category = 'assets', outType = 'df')
#' }
#'



getHistoricalFinancialsData <- function(symbol = NULL, category = NULL , outType = NULL){
  base <- "http://api.tradingeconomics.com/financials/historical/"
  df_final = data.frame()

  if(is.null(symbol)){
    stop("A symbol is needed!")
  }
  if(is.null(category)){
    stop("A category is needed!")
  }


  if(!is.null(symbol) & !is.null(category)){
    url <- paste(symbol, sep = ':' , category )
  }

  print(url)
  apikey_local <- .GlobalEnv$apiKey
  print(paste('c=',apikey_local, sep = ''))
  url <- paste(base, url, '?c=',apikey_local, sep = '')

  print(url)

  url <- URLencode(url)

  request <- GET(url)

  checkRequestStatus(http_status(request)$message)


  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)

  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$symbol,df_final$Category))


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



#'Return Financials data by symbol or country from Trading Economics API
#'@export getFinancialsData
#'
#'@param country string or list.
#'String to get data for one country List of strings to get data for more than one country.
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for more than one symbol.
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of Financials data by symbol or country.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getFinancialsData(symbol = c('aapl:us','acm:us'), outType = 'df')
#'getFinancialsData(country = c('united states', 'china'), outType = 'df')
#'}
#'


getFinancialsData <- function(country = NULL, symbol = NULL, outType = NULL){
  # Final string for the request data
  data_request_url <- ""

  #to get global 'apikey' to local function
  apikey_local <- .GlobalEnv$apiKey

  # Variables used to create the final string url
  url_base_tag <- "https://api.tradingeconomics.com/financials"
  symbol_tag <- ""
  country_tag <- "/companies"
  key_tag <- paste('?c=',apikey_local, sep = '')

  df_final = data.frame()

  if(!is.null(country) && (is.null(symbol))){
    #the 'key_tag' value has to be changed due to url enpoint use of '?' or '&' characters.
    key_tag <- paste('&c=',apikey_local, sep = '')
    if (length(country) > 1){
      country = paste(country, collapse = ',')
    }
    country_tag <- paste("/companies?country=", country, sep = '')
  }

  if (!is.null(symbol) && is.null(country)){
    country_tag <- ""
    if (length(symbol) > 1){
      symbol = paste(symbol, collapse = ',')
    }
    symbol_tag <- paste("/symbol/",symbol, sep = '')
  }

  print("Attention: If both 'country' and 'symbols' are null or not null at the same time, a full companies list will be provided ")

  data_request_url <- paste(url_base_tag,symbol_tag,country_tag,key_tag, sep = '')
  print(data_request_url)

  data_request_url <- URLencode(data_request_url)

  request <- GET(data_request_url)

  checkRequestStatus(http_status(request)$message)


  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)

  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Symbol))


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


#'Return list of fcategories of financials data
#'@export getFinancialsCategoryList
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of Financials categories data.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getFinancialsCategoryList(outType = 'df')
#'}
#'

getFinancialsCategoryList <- function(outType = NULL){
  # Final string for the request data
  data_request_url <- ""

  #to get global 'apikey' to local function
  apikey_local <- .GlobalEnv$apiKey

  # Variables used to create the final string url
  url_base_tag <- "https://api.tradingeconomics.com/financials/categories"
  key_tag <- paste('?c=',apikey_local, sep = '')

  df_final = data.frame()

  data_request_url <- paste(url_base_tag, key_tag, sep = '')
  print(data_request_url)

  data_request_url <- URLencode(data_request_url)

  request <- GET(data_request_url)

  checkRequestStatus(http_status(request)$message)


  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)

  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final))


  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")

    }else{
      return(df_final)

    }
  } else {
    stop('output_type options : df for data frame, lst(default)')
  }


  return(df_final)
}



  #'Return Financials data by category from Trading Economics API
  #'@export getFinancialsDataByCategory
  #'
  #'@param category string string
  #'String to get data for one category
  #'@param outType string.
  #''df' for data frame,
  #''lst'(default) for list.
  #'
  #'@return Return a list or data frame of Financials data by category.
  #'@section Notes:
  #'Without credentials only sample data will be provided.
  #'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
  #'@examples
  #'\dontrun{ getFinancialsDataByCategory(category = assets, outType = 'df')
  #'getFinancialsDataByCategory(catrgory = debt, outType = 'df')
  #'}
  #'


  getFinancialsDataByCategory <- function(category = NULL, outType = NULL){
    # Final string for the request data
    data_request_url <- ""

    #to get global 'apikey' to local function
    apikey_local <- .GlobalEnv$apiKey

    # Variables used to create the final string url
    url_base_tag <- "https://api.tradingeconomics.com/financials/category/"
    key_tag <- paste('?c=',apikey_local, sep = '')

    df_final = data.frame()

    if(is.null(category)){
      print("Please provide category parameter")
      return()
    }

    data_request_url <- paste(url_base_tag,category,key_tag, sep = '')
    print(data_request_url)

    data_request_url <- URLencode(data_request_url)

    request <- GET(data_request_url)

    checkRequestStatus(http_status(request)$message)


    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)

    if (is.null(outType)| identical(outType, 'lst')){
      df_final <- split(df_final , f =  paste(df_final$Symbol))


    } else if (identical(outType, 'df')){
      if (length(df_final) == 0){
        print ("No data provided for selected parameters")

      }else{
        return(df_final)

      }
    } else {
      stop('output_type options : df for data frame, lst(default) for category')
    }


    return(df_final)
  }
