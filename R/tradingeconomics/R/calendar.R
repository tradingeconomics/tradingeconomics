

dateCheck <- function(some_date){
  pattern <- "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
  if (!grepl(pattern, some_date)) stop('Incorrect date format!')
}


credCheck <- function(credentials){
  pattern <- "^...............:...............$"
  if (!grepl(pattern, credentials)) stop('Incorrect credentials format!')
}

#'Return calendar events from Trading Economics API
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
#'@param outType string.
#''dict'(default) for dictionary format output, 'df' for data frame,
#''raw' for list of dictionaries without any parsing.
#'@param credentials string.
#'User's credentials.
#' @return Return list or data frame of calendar events.
#'@section Notes:
#'All parameters are optional. When not supplying parameters, data for all countries and indicators will be provided.
#'Without credentials, only sample data is returned.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'getCalendarData(country = 'United States', indicator = 'Composite Pmi', initDate = '2011-01-01', endDate = '2016-01-01')
#'getCalendarData(country = c('United States', 'India'), indicator = c('Composite Pmi', 'Bankruptcies'),
#'                 initDate = '2011-01-01', endDate = '2016-01-01')
getCalendarData <- function(country = NULL, indicator = NULL, initDate= NULL, endDate= NULL, outType = NULL, credentials = NULL){
  base <- "http://api.tradingeconomics.com/calendar"
  if (is.null(country) & is.null(indicator)){
    url <- base
  } else if (is.null(country) & !is.null(indicator)){
    url <- paste(base, 'country/all', 'indicator',
                      paste(indicator, collapse = ','), sep = '/')
  } else if (!is.null(country) & is.null(indicator)){
    url <- paste(base, 'country',
                 paste(country, collapse = ','), sep = '/')
  } else {
    url <- paste(base, 'country', paste(country, collapse = ','), 'indicator',
                 paste(indicator, collapse = ','), sep = '/')
  }
  if (!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
    if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
    url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/')
  } else {
    url <- url
  }
  if (is.null(credentials)){
    credentials = 'guest:guest'
  } else {
    credCheck(credentials)
  }
  url <- paste(url, '?c=', credentials, sep = '')
  url <- URLencode(url)
  webData <-fromJSON(url)
  webResults <- data.frame('Date' = webData$Date, 'Country' = webData$Country, 'Category' = webData$Category, 'Event' = webData$Event,
                           'Reference' = webData$Reference, 'Unit' = webData$Unit, 'Source' = webData$Source, 'Actual' = webData$Actual,
                           'Previous' = webData$Previous, 'Forecast' = webData$Forecast, 'TEForecast' = webData$TEForecast)
  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =  paste(webResults$Country,webResults$Category))
  } else if (identical(outType, 'df')){
    webResults = webResults
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country and indicator')
  }
  return(webResults)
}



