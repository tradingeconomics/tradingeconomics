source("R/functions.R")
apikey_local <- .GlobalEnv$apiKey
lower.Date <- function(country, indicator, apikey_local){
  base <-  "https://api.tradingeconomics.com/historical/country"
  url_base <- paste(base, paste(country, collapse = ','), 'indicator',
                    paste(indicator, collapse = ','), sep = '/')
  if (is.null(apikey_local))
    credentials = 'guest:guest'
  url <- paste(url_base, '?c=', apikey_local, sep = '')
  url <- URLencode(url)
  webData <-fromJSON(url)
  iDate <- webData$DateTime[1]
  iDate <- gsub("T.*","",iDate)
  return(iDate)
}


#'Return historical information from Trading Economics API.
#'@export getHistoricalData
#'
#'@param country string or list.
#'String to get data for one country. List of strings to get data for
#'several countries. For example, country = c('United States', 'Australia').
#'@param indicator string or list.
#'String  to get data for one category. List of strings to get data for several calendar events.
#'For example, category = 'GDP Growth Rate' or
#'category = c('Exports', 'Imports').
#'@param ticker string.
#'String Unique ticker used by Trading Economics
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return a list or data frame of historical information for specific country and indicator.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getHistoricalData(country = 'United Kingdom', indicator = 'Imports',
#'initDate = '2011-01-01', endDate = '2016-01-01')
#' getHistoricalData(country = c('United States', 'United Kingdom'),
#' indicator = c('Imports','Exports'),initDate = '2011-01-01', endDate = '2016-01-01')
#' getHistoricalData(ticker = 'USURTOT', initDate = '2015-03-01')
#' getHistoricalData(country = c('United States', 'United Kingdom'),
#' indicator = c('Imports','Exports'))
#' getHistoricalData(country = 'United States', indicator = 'Imports')
#'
#' }


getHistoricalData <- function(country = NULL, indicator = NULL, ticker = NULL, initDate= NULL, endDate= NULL, outType = NULL){
  base <-  "https://api.tradingeconomics.com/historical/"
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

    if (!is.null(country) & !is.null(indicator)){
      url <- paste("country", country,'indicator', indicator, sep = '/')
    }
    if (!is.null(ticker)){
      url <- paste("ticker", ticker, sep = '/')
    }

    if (is.null(initDate) & is.null(endDate)){
        initDate <- seq(Sys.Date(), length=2, by="-10 years")[2]
        url <- paste(url, paste(initDate, sep = '/'), sep = '/')
    }
    else if (is.null(initDate) & !is.null(endDate)){
        dateCheck(endDate)
        lowDate <- seq(Sys.Date(), length=2, by="-10 years")[2]
        if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
        url <- paste(url, paste(lowDate, endDate, sep = '/'), sep = '/')
    }
    else if (!is.null(initDate) & is.null(endDate)){
        dateCheck(initDate)
        if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
        url <- paste(url, initDate, sep = '/')
    }
    else {
        dateCheck(initDate)
        dateCheck(endDate)
        if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
        if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
        if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
        url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/')
    }

    url <- paste(base, url, '?c=', apikey_local, sep = '')
    url <- URLencode(url)
    request <- GET(url)

    checkRequestStatus(http_status(request)$message)

    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country, df_final$Category))
  } else if (identical(outType, 'df')){

    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    } else {
      df_final = df_final[order(as.Date(df_final$Date)),]
      rownames(df_final) <- 1:nrow(df_final)
    }

  } else {
    stop('output_type options : df for data frame, lst(default) for list by country and indicator')
  }

  return(df_final)
}


#'Return historical information from Trading Economics API.
#'@export getHistoricalUpdates
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return a list or data frame of historical updates information.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getHistoricalUpdates()
#' }


getHistoricalUpdates <- function(outType = NULL){
  base <-  "https://api.tradingeconomics.com/historical/updates"
  df_final = data.frame()
  apikey_local <- .GlobalEnv$apiKey


  url <- paste(base, '?c=', apikey_local, sep = '')
  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country, df_final$Category))
  } else if (identical(outType, 'df')){

    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    } else {
      rownames(df_final) <- 1:nrow(df_final)
    }

  } else {
    stop('output_type options : df for data frame, lst(default) for list by country and indicator')
  }

  return(df_final)
}

