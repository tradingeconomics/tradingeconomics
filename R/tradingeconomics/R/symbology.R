source("R/functions.R")


#'Return symbology information from Trading Economics API
#'@export getSymbology
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'@param symbol string or list.
#'string for market symbol
#'@param ticker string.
#'string for symbol
#'@param isin, string.
#'@section Notes:
#'Is required to have one parameter.
#'
#'@return Returns a list or data frame of information for specific symbol, ticker or ISIN of a stock.
#'
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{getsymbology(symbol='aapl:us', outType = 'df')
#'getsymbology(ticker='aapl', outType = 'df')
#'getsymbology(isin='US0378331005', outType = 'df')
#'}
#'


getSymbology <- function (symbol = NULL , ticker = NULL, isin = NULL, outType = NULL ){

  base <- "https://api.tradingeconomics.com/markets/symbology/"
  url <- paste(base)
  df_final = data.frame()

  if(!is.null(symbol)) #if symbol is something
  {
      url <- paste(base,"symbol", paste(symbol, collapse = ','), sep = '/')
  }else if(!is.null(ticker)) #if ticker is something
  {
    url <- paste(base,"ticker", paste(ticker, collapse = ','), sep = '/')
  }else if(!is.null(isin)) #if isin is something
  {
    url <- paste(base,"isin", paste(isin, collapse = ','), sep = '/')
  }else{
    stop('Is required to have only one parameter. (symbol, ticker or isin)')
  }


  apikey_local <- .GlobalEnv$apiKey
  url <- paste(url,  '?c=', apikey_local, sep ='')



  url <- URLencode(url)
  request <- GET(url)
  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Symbol, df_final$Symbol))

  } else if (identical(outType, 'df')){
      rownames(df_final) <- 1:nrow(df_final)

  } else {
    stop('output_type options : df for data frame, lst(default) for list by symbol')

  }

  return(df_final)

}

