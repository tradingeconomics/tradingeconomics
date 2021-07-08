source("R/functions.R")


#'Get World Bank values from Trading Economics API
#'@export getWorldBankCategories
#'
#' @param category string.

#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from World Bank.
#'@section Notes:
#'Without credentials only sample information will be provided. Without a category, a list of all categories will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getWorldBankCategories(outType = 'df')
#'getWorldBankCategories(category = 'education')
#'getWorldBankCategories(category = 'education')
#'}


getWorldBankCategories <- function( category = NULL, outType = NULL){

  base <- "https://api.tradingeconomics.com/worldBank"
  url <- paste(base)
  df_final = data.frame()
  apikey_local <- .GlobalEnv$apiKey
  if(!is.null(category)){
    url<- paste(base, 'category', paste(category, collapse = ','), sep = '/')
  }else{
    url <- paste(base, 'categories', sep = '/')
  }

  url <- paste(url,  '?c=', apikey_local, sep ='')

  url <- URLencode(url)
  request <- GET(url)
  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$category))
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list by category')
  }

  return(df_final)

}


#'Get World Bank values from Trading Economics API
#'@export getWorldBankIndicators
#'
#' 
#'@param category string.
#'@param identifier string.
#'@param URL string.
#'@param series_code string.
#'@param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from World Bank.
#'@section Notes:
#'Detailed information about specific indicator for all countries using a series code , for a specific country with pagination, for a specific
#'indicator and country by using series_code or url.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getWorldBankIndicators(series_code = 'fr.inr.rinr', outType = 'df')
#'getWorldBankIndicators(identifier = 'portugal',category = 'country', outType = 'df')
#'getWorldBankIndicators(series_code = 'usa.fr.inr.rinr')
#'getWorldBankIndicators(URL = '/united-states/real-interest-rate-percent-wb-data.html')
#'}


getWorldBankIndicators <- function(category = NULL, identifier = NULL, series_code = NULL,  URL = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/worldBank"
  url <- paste(base)
  df_final = data.frame()


  if(!is.null(identifier)) #if indicator is something
  {
    if(is.null(category) || category == "country") {
      url <- paste(base,"country", paste(identifier, collapse = ','), sep = '/')
    } else if (category == "symbol"){
      url<- paste(base,"symbol", paste(identifier, collapse = ','), sep = '/')
    } else {
      return("Category not recognized. It can be null, country or symbol.")
    }
  }
  apikey_local <- .GlobalEnv$apiKey
  url <- paste(url,  '?c=', apikey_local, sep ='')

  if(!is.null(series_code)){
    url <- paste(base,"indicator", paste(identifier, collapse = ','), sep = '/')
    url <- paste(url,  '?c=', apikey_local, sep ='')
    url <- paste(url, paste(series_code, collapse = ','), sep = '&s=')
  }

  if(!is.null(URL)){
    url <- paste(base,"indicator", collapse = NULL, sep = '/')
    url <- paste(url,  '?c=', apikey_local, sep ='')
    url <- paste(url, paste(URL, collapse = ','), sep = '&url=')
    print(url)
  }



  url <- URLencode(url)
  request <- GET(url)
  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$category, df_final$URL))
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list by category')
  }

  return(df_final)

}

#'Get World Bank values from Trading Economics API
#'@export getWorldBankHistorical
#'
#' @param series_code string.
#'
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#'@return Returns a list or data from World Bank.
#'@section Notes:
#'Series_code must be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getWorldBankHistorical('usa.fr.inr.rinr')
#'
#'}
#'

getWorldBankHistorical <- function(series_code = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/worldBank/historical"
  apikey_local <- .GlobalEnv$apiKey
  url <- paste(base, '?c=', apikey_local, sep = '')
  df_final = data.frame()

  if(!is.null(series_code)){
    url <- paste(url, paste(series_code, collapse = ','), sep = '&s=')
  }

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
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)
}

