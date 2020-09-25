source("R/functions.R")

trim <- function (x) gsub("^\\s+|\\s+$", "", x)


#'Get markets values from Trading Economics API
#'@export getMarketsData
#'
#' @param marketsField string. Takes either one of 'commodity','currency',
#' 'index' or 'bond' as options.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data frame of available commodities, currencies, indeces or bonds and their latest values.
#'@section Notes:
#'Without credentials only sample information will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getMarketsData(marketsField = 'currency')
#'}

getMarketsData <- function(marketsField = NULL, country = NULL, symbol = NULL, cross=NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/markets/"
  fields <- c('commodities', 'currency', 'index', 'bond')

  if (length(symbol) > 1){
      symbol = paste(symbol, collapse = ',')
    }

  if (!is.null(marketsField)){
    if(marketsField %in% fields) {
      url <- paste(marketsField, sep = '/')
    }
    else {
      stop('Possible values for marketsField are commodities, currency, index or bond')
    }
  }
  else if(!is.null(cross)) {
    url <- paste('/currency?c=', apiKey, '&cross=', cross, sep = '')
  }
  else if(!is.null(symbol)) {
    url <- paste('symbol', symbol, sep = '/')
  }
  else if(!is.null(country)) {
    url <- paste('country', country, sep = '/')
  }

  if(is.null(cross)){
    url <- paste(base, url, '?c=', apiKey, sep = '')
  }
  else {
    url <- paste(base, url, sep = '')
  }

  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =paste(webResults$Country,webResults$Group))
  } else if (identical(outType, 'df')){
    webResults = webResults
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country ')
  }

  return(webResults)
}



#'Return historical information from Trading Economics API.
#'@export getHistoricalMarkets
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for
#'several symbols. For example, symbol = c('AAPL:US', 'INDU:IND').
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of historical information for specific market.
#'@section Notes:
#'A symbol must be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getHistoricalMarkets(c('AAPL:US','INDU:IND'),initDate = '2011-01-01', endDate = '2016-01-01', outType = 'df')
#' getHistoricalMarkets('aapl:us', initDate =  '2019-02-20' )
#'getHistoricalMarkets('AAPL:US', initDate = '2011-01-01', endDate = '2016-01-01')
#'
#' }


getHistoricalMarkets <- function(symbol = NULL, initDate= NULL, endDate= NULL, outType = NULL ){

  base <-  "https://api.tradingeconomics.com/markets/historical"
  df_final = data.frame()

  if(is.null(symbol)){
    stop("A symbol is needed!")
  }

  if(!is.null(symbol)){
    url <- paste(base, paste(symbol, collapse = ','), sep = '/')
  }

  url_base <- paste(url, '?c=', apiKey, sep = '')

  if(!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
    if(initDate > endDate) stop('Incorrect time period initDate - endDate!')

    url <- paste(url_base, paste(initDate, endDate, sep = '&d2='), sep = '&d1=')
  }
  else if(!is.null(initDate) & is.null(endDate)){
    dateCheck(initDate)
    if (initDate > Sys.Date())stop('Incorrect time period initDate!')
      url <- paste(url_base, paste(initDate, sep = ''), sep = '&d1=')
  }

  if (is.null(initDate)) {
    url <- url_base
  }

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
    } else {
        df_final = df_final[order(as.Date(df_final$Date)),]
        rownames(df_final) <- 1:nrow(df_final)
    }

  } else {
    stop('output_type options : df for data frame, lst(default) for list by symbol')
  }

  return(df_final)
}

#'Return markets intraday information from Trading Economics API.
#'@export getMarketsIntraday
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for
#'several symbols. For example, symbol = c('AAPL:US', 'INDU:IND').
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param time string with format: hh:mm.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of intraday information for specific symbol with initial and end dates.
#'@section Notes:
#'A symbol must be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getMarketsIntraday(symbol = 'AAPL:US', initDate = '2019-02-01', endDate = '2019-02-02')
#'
#'getMarketsIntraday(symbol = 'aapl:us', '2018-08-01', '2018-08-08')
#'
#' getMarketsIntraday('AAPL:US')
#' }
#'


getMarketsIntraday <- function (symbol = NULL, initDate = NULL, endDate = NULL, interval = NULL, outType = NULL ){
  base <-  "https://api.tradingeconomics.com/markets/intraday/"
  df_final = data.frame()

  if(is.null(symbol)){
    stop("A symbol is needed!")
  }

  if(!is.null(symbol) & !is.null(interval)){
    url <- paste(symbol, '?agr=', interval, sep = '')
  }
  else if(!is.null(symbol)){
    url <- paste(paste(symbol, collapse = ','), paste( '?c=', apiKey, sep = ''), sep = '')
  }

  if(!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
    if(initDate > endDate) stop('Incorrect time period initDate - endDate!')
    url <- paste(url, paste(initDate, endDate, sep = '&d2='), sep = '&d1=')
  }
  else if(!is.null(initDate) & is.null(endDate)){
    dateCheck(initDate)
    if (initDate > Sys.Date())stop('Incorrect time period initDate!')
    url <- paste(url, paste(initDate, sep = ''), sep = '&d1=')
  }
  
  if(!is.null(interval)){
    url <- paste(base, url, '&c=', apiKey, sep = '')
  }
  else{
    url <- paste(base, url, sep = '')
  }

  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Symbol))
  } else if (identical(outType , 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    } else {
      df_final = df_final[order(as.Date(df_final$Date)),]
      rownames(df_final) <- 1:nrow(df_final)
    }

  } else {
    stop('output_type options : df for data frame, lst(default) for list by Symbol ')
  }

  return(df_final)
}



#'Get latest markets by peers and components from Trading Economics API
#'@export getMarketsList
#'
#' @param symbol string.
#' @param marketsField string. Takes either one of 'peers' or 'components',as options.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data frame of available components, peers, at their latest values.
#'@section Notes:
#'A symbol must be provided, as well as the marketsfield.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getMarketsList(marketsField = 'peers', 'aapl:us', outType = 'df')
#' getMarketsList(marketsField = 'components', 'psi20:ind', outType = 'df')
#'}

getMarketsList <- function(marketsField, symbol = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/markets"
  fields <- c('peers', 'components')
  df_final = data.frame()
  step = 10

  if (!(marketsField %in% fields)){
    stop('Possible values for marketsField are components, or peers')
  } else {
    url <- paste(base, marketsField, sep = '/')

  }

  if(is.null(symbol)){
    stop("A symbol is needed!")
  }
  for(i in seq(1, length(symbol), by = step)){

    init = as.numeric(i)
    finit = as.numeric(i)+step-1


    if(!is.null(symbol)){
      url_base <- paste(base,paste(marketsField, collapse = ','), paste(symbol, collapse = ','), sep = '/')
      url <- paste(url_base, '?c=', apiKey, sep = '')
    }
  }

  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)

  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =paste(webResults$Symbol))
    } else if (identical(outType, 'df')){
      webResults = webResults
    } else {
      stop('output_type options : df for data frame, lst(default) for list by Symbol ')
  }

  return(webResults)
}

#'Get latest markets by peers and components from Trading Economics API
#'@export getMarketsSearch
#'
#' @param category string.
#' @param country string.
#' @param page string
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data frame of available Takes either one of 'index' or 'markets', 'bonds', 'commodities',
#'by country and pagination.
#'@section Notes:
#'A country must be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getMarketsSearch('united states'), getMarketsSearch( 'japan', 'index')
#' getMarketsSearch('united states', category = c('index' ,'markets')), getMarketsSearch('japan', ('index', 'markets'), '2')
#'}


getMarketsSearch <- function(country = NULL, category = NULL , outType = NULL){
  base <- "https://api.tradingeconomics.com/markets/search"
  df_final = data.frame()

  if (is.null(country)){
    stop('Country name should be provided')
  }
  else if(!is.null(country) & !is.null(category)) {
    url <- paste(base, '/', country, '?c=', apiKey, '&category=', category,  sep = '')
  }
  else if(!is.null(country)) {
    url <- paste(base, country, paste('?c=', apiKey, sep = ''), sep = '/')
  }

  url <- URLencode(url)
  request <- GET(url )

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$Country))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)
}

getMarketsForecast <- function(symbol = NULL, category = NULL , outType = NULL){
  base <- "https://api.tradingeconomics.com/markets/forecasts/"
  df_final = data.frame()

  if (length(symbol) > 1){
      symbol = paste(symbol, collapse = ',')
    }
  if (length(category) > 1){
      category = paste(category, collapse = ',')
    }

  if (!is.null(symbol)){
    url <- paste('symbol', symbol, sep = '/')
  }
  else if(!is.null(category)) {
    url <- paste(category, sep = '/')
  }
  else {
   stop('Please enter a country or category')
  }

  url <- paste(base, url, '?c=', apiKey, sep = '')
  url <- URLencode(url)
  request <- GET(url )

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f = paste(df_final$Country))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)
}
