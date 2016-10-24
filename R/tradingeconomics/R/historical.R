

lower.Date <- function(country, indicator, credentials){
  base <-  "http://api.tradingeconomics.com/historical/country"
  url_base <- paste(base, paste(country, collapse = ','), 'indicator',
                    paste(indicator, collapse = ','), sep = '/')
  if (is.null(credentials))
    credentials = 'guest:guest'
  url <- paste(url_base, '?c=', credentials, sep = '')
  url <- URLencode(url)
  webData <-fromJSON(url)
  iDate <- webData$DateTime[1]
  iDate <- gsub("T.*","",iDate)
  return(iDate)
}


dateCheck <- function(some_date){
  pattern <- "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
  if (!grepl(pattern, some_date)) stop('Incorrect date format!')
}


credCheck <- function(credentials){
  pattern <- "^...............:...............$"
  if (!grepl(pattern, credentials)) stop('Incorrect credentials format!')
}

#'Return historical information from Trading Economics API.
#'@param country string or list.
#'String to get data for one country. List of strings to get data for
#'several countries. For example, country = c('United States', 'Australia').
#'@param indicator string or list.
#'String  to get data for one category. List of strings to get data for several calendar events.
#'For example, category = 'GDP Growth Rate' or
#'category = c('Exports', 'Imports').
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''dict'(default) for dictionary format output, 'df' for data frame,
#''raw' for list of dictionaries without any parsing.
#'@param credentials string.
#'User's credentials.
#' @return Return a list or data frame of historical information for specific country and indicator.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'getHistoricalData(country = 'United States', indicator = 'Imports',
#'                   initDate = '2011-01-01', endDate = '2016-01-01')
#'getHistoricalData(country = c('United States', 'United Kingdom'), indicator = c('Imports','Exports'),
#'                   initDate = '2011-01-01', endDate = '2016-01-01')


getHistoricalData <- function(country, indicator, initDate= NULL, endDate= NULL, outType = NULL, credentials = NULL){
  base <-  "http://api.tradingeconomics.com/historical/country"
  url_base <- paste(base, paste(country, collapse = ','), 'indicator',
                    paste(indicator, collapse = ','), sep = '/')
  if (is.null(initDate) & is.null(endDate)){
      url_base <- url_base
  } else if (is.null(initDate) & !is.null(endDate)){
      dateCheck(endDate)
      lowDate <- lower.Date(country, indicator, credentials)
      dateCheck(lowDate)
      if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
      url_base <- paste(url_base, paste(lowDate, endDate, sep = '/'), sep = '/')
  } else if (!is.null(initDate) & is.null(endDate)){
      dateCheck(initDate)
      if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
      url_base <- paste(url_base, initDate, sep = '/')
  } else {
      dateCheck(initDate)
      dateCheck(endDate)
      if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
      if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
      if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
      url_base <- paste(url_base, paste(initDate, endDate, sep = '/'), sep = '/')
  }
  if (is.null(credentials)){
    credentials = 'guest:guest'
  } else {
    credCheck(credentials)
    }
  url <- paste(url_base, '?c=', credentials, sep = '')
  url <- URLencode(url)
  webData <-fromJSON(url)
  webResults <- data.frame('Country' = webData$Country,'Category' = webData$Category,'Date'= webData$DateTime,
                           'Value' = webData$Value, 'Frequency' = webData$Frequency)
  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =  paste(webResults$Country,webResults$Category))
  } else if (identical(outType, 'df')){
    webResults = webResults
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country and indicator')
  }
  return(webResults)
}


