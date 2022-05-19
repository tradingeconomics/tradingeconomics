source("R/functions.R")


#'Return calendar events from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'
#'
#'@export getCalendarData
#'
#'
#'@param country string or list.
#'String to get data for one country. List of strings to get data for
#'several countries. For example, country = c('United States', 'Australia').
#'@param indicator   string or list.
#'String  to get data for one category. List of strings to get data for several calendar events.
#'For example, category = 'GDP Growth Rate' or
#' category = c('Exports', 'Imports').
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param id string with calendar id
#'@param ticker string with ticker
#'@param importance string with importance
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return list or data frame of calendar events.
#'@section Notes:
#'All parameters are optional. When not supplying parameters, data for all countries and indicators will be provided.
#'Without credentials, only sample data is returned.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getCalendarUpdates}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{getCalendarData()
#'getCalendarData(id= c('174108','160025','160030'), outType = 'df')
#'getCalendarData(ticker= c('IJCUSA','SPAINFACORD','BAHRAININFNRATE'))
#'getCalendarData(country = 'spain', indicator = 'Bankruptcies',initDate = '2016-12-01',
#'endDate = '2017-02-25')
#'getCalendarData(country = c('portugal', 'India'),indicator = c('Composite Pmi', 'Bankruptcies'),
#'initDate = '2011-01-01', endDate = '2016-01-01')
#'getCalendarData(ticker= c('IJCUSA','SPAINFACORD','BAHRAININFNRATE'), initDate = '2018-01-01',
#'endDate = '2018-03-01')
#'getCalendarData(country = 'United States', indicator = 'initial jobless claims')
#'getCalendarData(country = 'United States')
#'getCalendarData(indicator = 'initial jobless claims')
#'}
#'

getCalendarData <- function(country = NULL, indicator = NULL, id = NULL, ticker = NULL, initDate= NULL, endDate= NULL, importance= NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/calendar/"
  df_final = data.frame()

  if (length(country) > 1){
      country = paste(country, collapse = ',')
    }
  if (length(indicator) > 1){
    indicator = paste(indicator, collapse = ',')
  }
  if (length(ticker) > 1){
    ticker = paste(ticker, collapse = ',')
  }
  if (length(id) > 1){
    id = paste(id, collapse = ',')
  }

  if(!is.null(country)& !is.null(indicator)){
    url <- paste('country', country, 'indicator', indicator, sep = '/')
  }
  else if (!is.null(country)){
    url <- paste('country', country, sep = '/')
  }
  else if (!is.null(indicator)){
    url <- paste('indicator', indicator, sep = '/')
  }
  else if (!is.null(id)){
    url <- paste("calendarid", id, sep = '/')
  }
  else if (!is.null(ticker)){
    url <- paste("ticker", ticker, sep = '/')
  }
  else if(is.null(country) & !is.null(initDate) & !is.null(endDate)){
    url <- 'country/all/'
  }
  else {
    url <- ''
  }

  if (!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
    url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/')
  }
  else if (!is.null(initDate)){
    dateCheck(initDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    url <- paste(base, "All", collapse = NULL, sep = '/')
  }
  apikey_local <- .GlobalEnv$apiKey

  url <- paste(base, url, '?c=', apikey_local, sep = '')

  if(!is.null(importance)){
    url <- paste(url,'&importance=', importance, sep='')
  }

  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country,df_final$Category))
  } else if (identical(outType, 'df')){
    df_final$Date <- strptime(as.character(df_final$Date),'%Y-%m-%dT%H:%M')
    df_final <- df_final[order(df_final$Date),]
    rownames(df_final) <- 1:nrow(df_final)
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country and indicator')
  }

  return(df_final)
}

#'----------------------------------
#'-------- Calendar Updates --------
#'----------------------------------

#'Return historical information from Trading Economics API.
#'@export getCalendarUpdates
#'
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return list or data frame of calendar updates.
#'@section Notes:
#'Without credentials, only sample data is returned.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getCalendarData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{getCalendarUpdates()
#'}
#'

getCalendarUpdates <- function(outType = NULL){
  base <- "https://api.tradingeconomics.com/calendar/updates"
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
    df_final <- split(df_final , f =  paste(df_final$Country,df_final$Category))
  } else if (identical(outType, 'df')){
    rownames(df_final) <- 1:nrow(df_final)
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country and indicator')
  }

  return(df_final)
}
