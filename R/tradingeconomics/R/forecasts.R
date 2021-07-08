source("R/functions.R")



#'Return forecast values from Trading Economics API
#'@export getForecastData
#'
#'@param country string or list.
#'String to get data for one country. List of strings to get data for
#'several countries. For example, country = c('United States', 'Australia').
#'@param ticker string or list.
#'@param indicator string or list.
#'String  to get data for one category. List of strings to get data for several calendar events.
#'For example, category = 'GDP Growth Rate' or
#'category = c('Exports', 'Imports').
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list .
#'
#'@return Return a list or dataframe of forecast values by country, by indicator, by country and indicator.
#'@section Notes:
#'At least one of parameters, country or indicator, should be provided.
#'Without credentials, only sample data is returned.
#' @seealso \code{\link{getMarketsData}}, \code{\link{getIndicatorData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{ getForecastData(country = 'United States', indicator = 'Imports')
#'getForecastData(country = c('United States', 'china'), indicator = c('gdp','inflation rate'))
#' getForecastData(country = 'United States')
#' getForecastData(indicator = 'Imports')
#'}


getForecastData <- function(country = NULL, indicator = NULL, outType = NULL, ticker = NULL){
  base <- "https://api.tradingeconomics.com/forecast/"
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

  if(!is.null(indicator) & !is.null(country)) {
    url <- paste('country', country, 'indicator', indicator, sep = '/')
  } 
  else if (!is.null(indicator)){
    url <- paste('indicator', indicator, sep = '/')
  }
  else if (!is.null(country)){
    url <- paste('country', country, sep = '/')
  } 
  else if(!is.null(ticker)){
    url <- paste('ticker', ticker, sep = '/')
  }
  else {
    stop('At least one of parameters, country, ticker or indicator, should be indicated. ')
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
    df_final <- split(df_final , f = df_final$Country)
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)
}





