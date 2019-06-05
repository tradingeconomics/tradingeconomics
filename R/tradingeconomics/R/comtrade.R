source("R/functions.R")


#'Get Comtrade values from Trading Economics API
#'@export getComtradeCategories
#'
#' @param category string.
#' @param page string.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from World Bank.
#'@section Notes:
#'Without credentials only sample information will be provided. Without a category, a list of all categories will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getComtradeCategories(outType = 'df')
#'}

getComtradeCategories <- function(id = NULL, outType = NULL){

  base <- "https://api.tradingeconomics.com/comtrade/categories"
  url <- paste(base, '?c=', apiKey, sep = '')
  df_final = data.frame()

  print(url)
  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$id))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)

}

#'Get Comtrade values from Trading Economics API
#'@export getComtradeCountry
#'
#' @param country string.
#' @param page_number string.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data about Comtrade.
#'@section Notes:
#'Without credentials only sample information will be provided. Without a country, a list of countries will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getComtradeCountry()
#'getComtradeCountry('portugal')
#'getComtradeCountry('portugal', page_number = '2')
#'getComtradeCountry(c('portugal', 'spain'), page_number = '4')
#'}
#'

getComtradeCountry <- function(country = NULL, page_number = NULL, outType = NULL, id = NULL){
  base <- "https://api.tradingeconomics.com/comtrade"
  df_final = data.frame()

  if(is.null(country)){
    url <- paste(base, 'countries', sep= '/')

  }
  if(!is.null(country)){
    url <- paste(base, 'country', paste(country, collapse = '/'), sep = '/')
  }
  if(!is.null(page_number)){
    url <- paste(url, paste(page_number, collapse = ','), sep = '/')
  }else{

  }

  url <- paste(url, '?c=', apiKey, sep = '')


  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$country1,df_final$country2, df_final$id))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)

}


#'Get Comtrade values from Trading Economics API
#'@export getComtradeHistorical
#'
#' @param symbol string.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or historical data about Comtrade.
#'@section Notes:
#'Without credentials only sample information will be provided.A symbol must be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getComtradeHistorical('PRTESP24031')
#'}
#'
#'

getComtradeHistorical <- function(symbol = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/comtrade/historical"
  df_final = data.frame()

  if(!is.null(symbol)){
    url <- paste(base, paste(symbol, collapse = ','), sep = '/')
  }

  url <- paste(url, '?c=', apiKey, sep = '')

  print(url)
  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$symbol))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)


}
