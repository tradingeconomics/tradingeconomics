source("R/functions.R")

#'Return ratings information from Trading Economics API
#'@export getCreditRating
#'@param country string or list.
#'String for one country information. List of strings for
#'several countrys, for example country = c('country_name', 'country_name').
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'
#'@section Notes:
#'All parameters are optional. Without parameters a list of all indicators will be provided exmp('').
#'Without credentials default information will be provided.
#'
#'@return Return a list or data frame of historical information for specific country or countries.
#'
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{getCreditRating('United States')
#'getCreditRating(country = c('United States', 'Portugal'))
#'getCreditRating(outType = 'df')}
#'


getCreditRating <- function(country = NULL, outType = NULL){
  
  base <- "https://api.tradingeconomics.com/ratings/"
  df_final = data.frame()
  url = ''
  
  if (length(country) > 1){
      country = paste(country, collapse = ',')
    }

  if (!is.null(country)){
    url <- paste(country, sep = '/')
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
    df_final <- split(df_final , f = paste(df_final$Country))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)

}



#'Return credit rating historical information by country, or countries, default is United Satates
#'@export getCreditRatingHistorical
#'
#'@param country string or list.
#'String for one country information. List of strings for
#'several countrys, for example country = c('country_name', 'country_name').
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'
#'@section Notes:
#'country needs to be provided.
#'
#'@return Return a list or data frame of historical information for specific country or countries.
#'
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{getCreditRatingHistorical('United States')
#'getCreditRatingHistorical(country = c('United States', 'Portugal'))
#'}
#'


getCreditRatingHistorical <- function(country = NULL, outType = NULL, initDate= NULL, endDate= NULL){

  if(is.null(country)) {
    print("Country is needed.")
    return (NULL)
  }

  base <-  "https://api.tradingeconomics.com/ratings/historical/"
  df_final = data.frame()

  if (length(country) > 1){
    country = paste(country, collapse = ',')
  }
  if(!is.null(country)){
    url <- paste(country, sep = '/')
  }

  if (is.null(initDate) & !is.null(endDate)){
    dateCheck(endDate)
    lowDate <- seq(Sys.Date(), length=2, by="-10 years")[2]
    if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
    url <- paste(url, paste(lowDate, endDate, sep = '/'), sep = '/')
  }
  else if (!is.null(initDate) & is.null(endDate)){
      dateCheck(initDate)
      if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
      url <- paste(url, initDate, sep = '/')
  }
  else if(!is.null(initDate) & !is.null(endDate)) {
      dateCheck(initDate)
      dateCheck(endDate)
      if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
      if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
      if (initDate > endDate) stop('Incorrect time period initDate - endDate!')
      url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/')
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
    df_final <- split(df_final , f = paste(df_final$Country))
  } else if (identical(outType, 'df')){
    df_final = df_final
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country ')
  }

  return(df_final)
}
