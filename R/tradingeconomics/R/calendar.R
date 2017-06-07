
dateCheck <- function(some_date){
  pattern <- "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
  if (!grepl(pattern, some_date)) stop('Incorrect date format!')
}

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
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return list or data frame of calendar events.
#'@section Notes:
#'All parameters are optional. When not supplying parameters, data for all countries and indicators will be provided.
#'Without credentials, only sample data is returned.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getCalendarData(country = 'United States', indicator = 'Composite Pmi',
#'  initDate = '2011-01-01', endDate = '2016-01-01')
#' getCalendarData(country = c('United States', 'India'),
#'  indicator = c('Composite Pmi', 'Bankruptcies'),
#'   initDate = '2011-01-01', endDate = '2016-01-01')
#'   }
#'

getCalendarData <- function(country = NULL, indicator = NULL, initDate= NULL, endDate= NULL, outType = NULL) {
  base <- "https://api.tradingeconomics.com/calendar"

  df_final = data.frame()
  step = 10
  for(i in seq(1, length(country), by = step)){
    init = as.numeric(i)
    finit = as.numeric(i)+step

    if (is.null(country) & is.null(indicator)){
      url <- base
    } else if (is.null(country) & !is.null(indicator)){
      url <- paste(base, 'country/all', 'indicator',
                        paste(indicator, collapse = ','), sep = '/')
    } else if (!is.null(country) & is.null(indicator)){
      url <- paste(base, 'country',
                   paste(country[init:finit], collapse = ','), sep = '/')
    } else {
      url <- paste(base, 'country', paste(country[init:finit], collapse = ','), 'indicator',
                   paste(indicator, collapse = ','), sep = '/')
    }

    if (!is.null(initDate) & !is.null(endDate)){
      dateCheck(initDate)
      dateCheck(endDate)
      if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
      if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
      url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/')
    } else {
      url <- url
    }

    url <- paste(url, '?c=', apiKey, sep = '')
    url <- URLencode(url)
    http <- http_status(GET(url))

    if (class(try(fromJSON(url), silent=TRUE)) == 'try-error') {
      stop(paste('Something went wrong: ', http$message, sep=" "))
    }

    webData <-fromJSON(url)
    webResults <- data.frame('Date' = webData$Date, 'Country' = webData$Country, 'Category' = webData$Category, 'Event' = webData$Event,
                             'Reference' = webData$Reference, 'Unit' = webData$Unit, 'Source' = webData$Source, 'Actual' = webData$Actual,
                             'Previous' = webData$Previous, 'Forecast' = webData$Forecast, 'TEForecast' = webData$TEForecast)
    df_final = rbind(df_final, webResults)
  }

  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country,df_final$Category))
  } else if (identical(outType, 'df')){
    df_final$Date <- strptime(as.character(df_final$Date),'%Y-%m-%dT%H:%M')
    df_final <- df_final[order(df_final$Date),]
    rownames(df_final) <- 1:nrow(df_final)
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country and indicator')
  }

  return(df_final)
 }



