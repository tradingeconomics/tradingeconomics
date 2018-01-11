source("R/functions.R")

lower.Date <- function(country, indicator, apiKey){
  base <-  "https://api.tradingeconomics.com/historical/country"
  url_base <- paste(base, paste(country, collapse = ','), 'indicator',
                    paste(indicator, collapse = ','), sep = '/')
  if (is.null(apiKey))
    credentials = 'guest:guest'
  url <- paste(url_base, '?c=', apiKey, sep = '')
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
#'\dontrun{ getHistoricalData(country = 'United States', indicator = 'Imports',
#' initDate = '2011-01-01', endDate = '2016-01-01')
#'getHistoricalData(country = c('United States', 'United Kingdom'),
#' indicator = c('Imports','Exports'),
#' initDate = '2011-01-01', endDate = '2016-01-01')
#' }


getHistoricalData <- function(country, indicator, initDate= NULL, endDate= NULL, outType = NULL){
  base <-  "https://api.tradingeconomics.com/historical/country"

  df_final = data.frame()
  step = 10

  for(i in seq(1, length(country), by = step)){

    init = as.numeric(i)
    finit = as.numeric(i)+step-1

    url_base <- paste(base, paste(na.omit(country[init:finit]), collapse = ','), 'indicator',
                      paste(indicator, collapse = ','), sep = '/')


    if (is.null(initDate) & is.null(endDate)){
        initDate <- seq(Sys.Date(), length=2, by="-10 years")[2]
        url_base <- paste(url_base, paste(initDate, sep = '/'), sep = '/')
    } else if (is.null(initDate) & !is.null(endDate)){
        dateCheck(endDate)
        lowDate <- seq(Sys.Date(), length=2, by="-10 years")[2]
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

    url <- paste(url_base, '?c=', apiKey, sep = '')
    url <- URLencode(url)
    request <- GET(url)

    checkRequestStatus(http_status(request)$message)

    webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

    df_final = rbind(df_final, webResults)
    Sys.sleep(0.5)
  }

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
    stop('output_type options : df for data frame, lst(defoult) for list by country and indicator')
  }

  return(df_final)
}


