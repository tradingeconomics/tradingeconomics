
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

#'Return Financials data by stock symbol from Trading Economics API
#'@export getFinancialsData
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for more than one symbol.

#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of Financials data by stock symbol.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getFinancialsData(symbol ='aapl:us,acm:us', outType = 'df')
#' }
#' 


getFinancialsData <- function(symbol = NULL, outType = NULL){
  base <- "http://api.tradingeconomics.com/financials/symbol/"
  df_final = data.frame()
  
  if(is.null(symbol)){
    stop("A symbol is needed!")
  }
  
  
  if(!is.null(symbol)){
    url <- paste(symbol)
  }
  
  print(url)
  apikey_local <- .GlobalEnv$apiKey
  print(apikey_local)
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
