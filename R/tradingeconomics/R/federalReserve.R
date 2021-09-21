source("R/functions.R")


#'Get Federal Reserve values from Trading Economics API
#'@export getFedReserve
#'
#'
#'@param category string.
#'@param indicator string.
#'@param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from Federal Reserve.
#'@section Notes:
#'Without credentials only sample information will be provided. Without a category, a list of the name of all states will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getFedReserve(indicator = 'arkansas', category = 'county')
#'getFedReserve(category = 'states')
#'}
#'

getFedReserve <- function(indicator = NULL, category = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/fred"
  df_final = data.frame()

  if(!is.null(category == "name")) {
    url <- paste(base,"states", sep = '/')

  }
  if (category == "county"){
    url <- paste(base,"counties", paste(indicator, collapse = ','), sep = '/')

  }
  apikey_local <- .GlobalEnv$apiKey
  url <- paste(url, '?c=', apikey_local, sep = '')
  
  print(url)
  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$county, df_final$name ))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)

}


#'Get Federal Reserve values from Trading Economics API
#'@export getFedReserveSnapshot
#'@param county string.
#' @param country string.
#' @param state string.
#' @param symbol string.
#' @param URL string.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from Federal Reserve.
#'@section Notes:
#'Without credentials only sample information will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getFedReserveSnapshot('AGEXMAK2A647NCEN', outType = 'df')
#'getFedReserveSnapshot(county = 'arkansas')
#'getFedReserveSnapshot(county ='Pike County')
#'getFedReserveSnapshot(country = 'united states')
#'getFedReserveSnapshot(country = 'united states')
#'getFedReserveSnapshot(URL = '/united-states/income-inequality-in-aleutians-east
#'-borough-ak-fed-data.html' )
#'}
#'
getFedReserveSnapshot <- function(symbol = NULL, state = NULL, county = NULL, country = NULL, URL = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/fred/snapshot"
  df_final = data.frame()
  apikey_local <- .GlobalEnv$apiKey
  if(!is.null(URL)){
    url <- paste(base, 'url', sep = '/')
    url <- paste(url, '?c=', apikey_local, sep = '')
    url <- paste(url, paste(URL, collapse = ','), sep = '&url=')

    url <- URLencode(url)
    request <- GET(url)
  }

  if(!is.null(symbol)){
    url <- paste(base, 'symbol', paste(symbol, collapse = ','), sep = '/')

  }
  if(!is.null(country)){
    url <- paste(base, 'country', paste(country, collapse = ','), sep = '/')
  }
  if(!is.null(state)){
    url <- paste(base, 'state', paste(state, collapse = ','), sep = '/')

  }
  if(!is.null(county)){
    url <- paste(base, 'county', paste(county, collapse = ','), sep = '/')

  }
  
  url <- paste(url, '?c=', apikey_local, sep = '')

  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$Country, df_final$symbol, df_final$URL ))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)

}

#'Get Federal Reserve values from Trading Economics API
#'@export getFedHistorical
#'
#'@param symbol string.
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or historical data from Federal Reserve.
#'@section Notes:
#'Without credentials only sample information will be provided. A symbol must be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getFedHistorical('RACEDISPARITY005007', outType = 'df')
#'getFedHistorical(c('RACEDISPARITY005007','2020RATIO002013'), outType = 'df')
#'getFedHistorical(symbol='BAMLC0A1CAAAEY', initDate = '2018-05-01'  , outType = 'df')
#'getFedHistorical(symbol='BAMLC0A1CAAAEY', initDate = '2018-05-01', endDate = '2019-01-01'  , outType = 'df'))
#'}
#'

getFedHistorical <- function(symbol = NULL, initDate = NULL, endDate = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/fred/historical"
  df_final = data.frame()
  apikey_local <- .GlobalEnv$apiKey
  if(is.null(symbol)) {
    print("A symbol is needed!")
  }else{
    url <- paste (base, paste(symbol, collapse = ','), sep = '/')
  }

  url <- paste(url, '?c=', apikey_local, sep = '')
  
  
  if (!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
    url <- paste(url, '&d1=' , paste(initDate, collapse = ','), sep = '')
    url <- paste(url, '&d2=', paste(endDate, collapse = ','), sep = '' )
  } 
  else if (!is.null(initDate)){
    dateCheck(initDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    url <- paste(url, '&d1=' , paste(initDate, collapse = ','), sep = '' )
  }
 
  url <- URLencode(url)
  request <- GET(url)


  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$symbol ))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list')
  }

  return(df_final)

}

