source("R/functions.R")


#'Return earnings information from Trading Economics API
#'@export getEarnings
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'@param category string or list.
#'string for market symbol
#'@param indicator string.
#'string for symbol
#'@param initDate, string.
#'@param endDate, string.
#'@param type, string.Could be earnings, ipo, or dividends.
#'@section Notes:
#'All parameters are optional. Without parameters a list will be provided exmp('').
#'Without credentials default information will be provided.
#'
#'@return Returns a list or data frame of information for specific country, or for specific symbol by initial and end dates.
#'
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{getEarnings(outType = 'df')
#'getEarnings('united states', outType = 'df' )
#'getEarnings(initDate = '2017-01-01', outType = 'df')
#'getEarnings(indicator='msft:us', category="symbol" , '2017-01-01' )
#'getEarnings(indicator='msft:us', category="symbol", '2016-01-01','2017-01-01', outType = 'df')
#'getEarnings(type ='dividends', outType = 'df')
#'}
#'


getEarnings <- function (indicator = NULL , initDate = NULL, endDate = NULL, type = NULL, category =NULL, outType = NULL ){

  base <- "https://api.tradingeconomics.com/earnings"
  url <- paste(base)
  df_final = data.frame()

  if(!is.null(indicator)) #if indicator is something
  {
    if(is.null(category) || category == "country") {
      url <- paste(base,"country", paste(indicator, collapse = ','), sep = '/')
    } else if (category == "symbol"){
      url <- paste(base,"symbol", paste(indicator, collapse = ','), sep = '/')
    } else {
      return("Category not recognized. It can be null, country or symbol.")
    }
  }
  apikey_local <- .GlobalEnv$apiKey
  url <- paste(url,  '?c=', apikey_local, sep ='')

  if (!is.null(initDate) ){
    dateCheck(initDate)
    if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
    url <- paste(url,  '&d1=', initDate, sep ='')
    if (!is.null(endDate) ) {
      dateCheck(endDate)
      if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
      url <- paste(url,  '&d2=', endDate, sep ='')
    }
  }

  if  (!is.null(type)) {
    url <- paste(url,  '&type=', type, sep ='')
  }

  url <- URLencode(url)
  request <- GET(url)
  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country, df_final$Symbol))

  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")

    }else{
      df_final = df_final[order(as.Date(df_final$Date)),]
      rownames(df_final) <- 1:nrow(df_final)

    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country or symbol')

  }

  return(df_final)

}

