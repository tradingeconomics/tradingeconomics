source("R/functions.R")


#'Return historical information from Trading Economics API.
#'@export getHistorical
#'
#'@param symbol string or list.
#'String to get data for one symbol. List of strings to get data for more than one symbol.
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#' @return Return a list or data frame of historical information for specific symbol.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{getHistorical('aapl:us')
#'getHistorical('USURTOT')
#'getHistorical('USURTOT', '2016-01-01')
#'getHistorical('aapl:us', '2016-01-01'),
#'getHistorical('RACEDISPARITY005007:fred')
#'getHistorical('PRTESP24031:comtrade')
#'getHistorical('usa.fr.inr.rinr:worldbank')
#' }


getHistorical <- function(symbol = NULL, initDate= NULL, endDate= NULL, outType = NULL){

  base <-  "https://api.tradingeconomics.com"

  df_final = data.frame()

  if (str_detect(symbol, ':fred')){
    symbol_free = str_remove(symbol,':fred')
    url <- paste (base, "fred/historical", paste(symbol_free, collapse = ','), sep = '/')

  }

  else if (str_detect(symbol, ':comtrade')){
     symbol_free = str_remove(symbol,':comtrade')
     url <- paste (base, "comtrade/historical", paste(symbol_free, collapse = ','), sep = '/')

   }
   else if (str_detect(symbol, ':worldbank' )){
     symbol_free = str_remove(symbol,':worldbank')
     url <- paste (base, "/worldbank/historical?s=", paste(symbol_free, collapse = ','), sep = '')

   }
   if (!str_detect(symbol,':')){
    url <- paste(base, "historical/ticker",paste(symbol, collapse = ','), sep = '/')

   }

   else if(!str_detect(symbol,'worldbank') & !str_detect(symbol,'fred') & !str_detect(symbol,'comtrade')& str_detect(symbol, ':')){
     url <- paste(base, "markets/historical",paste(symbol, collapse = ','), sep = '/')

   }
  if(!is.null(initDate) & str_detect(url, 'ticker')){
    dateCheck(initDate)
    url <- paste(url, paste(initDate, sep = ''), sep = '/')
  }else if(!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    url <- paste(url, paste(initDate, sep = ''), sep = '?d1=')

  }
  if (!is.null(initDate) & !is.null(endDate)){
    dateCheck(initDate)
    dateCheck(endDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
    if(initDate > endDate) stop('Incorrect time period initDate - endDate!')
    url <- paste(url, paste(initDate, endDate, sep = '&d2='), sep = '?d1=')

  }
  apikey_local <- .GlobalEnv$apiKey
  if(str_detect(url, 'worldbank')){
    url <- paste(url, "&c=", apikey_local, sep = '')
  }else if (str_detect(url, 'd1')){
    url <- paste(url, "&c=", apikey_local, sep = '')
  }else{
    url <- paste(url, "?c=", apikey_local, sep = '')
  }
  url <- URLencode(url)
  request <- GET(url)
  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    if(str_detect(url,'worldbank') & str_detect(url,'fred') & str_detect(url,'comtrade') & str_detect(url, 'markets')){
      df_final <- split(df_final , f = paste(df_final$Symbol))
    }else if (str_detect(url,'ticker')){
    df_final <- split(df_final , f = paste(df_final$HistoricalDataSymbol))
    }
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



