source("R/functions.R")

#'Return search information from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'
#'
#'@export getSearch
#'
#'@param category string.
#'String for one category information, for example category = 'markets'.
#'@param search_term string.
#'String for one search term. For example
#'search_term = 'gold' or
#'search_term = 'japan'.
#'@param outType string.
#''lst'(default) for list format output, 'df' for data frame,
#'
#'@return Return a list or dictionary of all categories available, search by term/keyword and category, search for term/keyword in all categories available.
#'@section Notes:
#'All parameters are optional. Without parameters a list of all categories will be provided.
#'Without credentials default information will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}} and \code{\link{getIndicatorData}} and \code{\link{getEurostatData}} and \code{\link{getEurostatHistorical}}
#'@examples
#'\dontrun{getSearch()
#' getSearch(search_term = 'gold', outType = 'df')
#'getSearch(search_term = 'japan', , category= 'markets', outType = 'df')
#'getCalendarData(ticker= c('IJCUSA','SPAINFACORD','BAHRAININFNRATE'),
#'initDate = '2018-01-01', endDate = '2018-03-01')
#'   }
#'


getSearch <- function(search_term = NULL, category = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/search/"
  df_final = data.frame()
  apikey_local <- .GlobalEnv$apiKey
  if (is.null(search_term) & is.null(category)){
    url <- 'categories'
    url <- paste(base, url, '?c=',apikey_local, sep = '')
  }
  else if (is.null(category) & !is.null(search_term)){
    url <- paste(search_term)
    url <- paste(base, url, '?c=',apikey_local, sep = '')

  }
  else if (!is.null(search_term) & !is.null(category)){
    url <- paste(search_term,'?category=',category,sep = '')
    url <- paste(base, url, '&c=',apikey_local, sep = '')

  }

  url <- URLencode(url)
  
  request <- GET(url)
  
  checkRequestStatus(http_status(request)$message)
  
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)
  
  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country,df_final$Symbol,df_final$Categories))
    
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
      
    }else{
      return(df_final)
    }
   }else {
    stop('output_type options : df for data frame, lst(default)')
  }
  return(df_final)
}

