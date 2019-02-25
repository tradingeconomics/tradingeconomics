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
  base <- "https://api.tradingeconomics.com/ratings"
  df_final = data.frame()

  if(is.null(country)){
    url <- paste(base, sep = '')

  } else{
    url <- paste(base,paste(country, collapse = ','), sep = '/')

  }

    url <- paste(url, '?c=', apiKey, sep = '')

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


getCreditRatingHistorical <- function(country = NULL, outType = NULL){

  if(is.null(country)) {
    print("Country is needed.")
    return (NULL)
  }

  base <-  "https://api.tradingeconomics.com/ratings/historical"
  df_final = data.frame()

  if(!is.null(country)){
    url <- paste(base,paste(country, collapse = ','), sep = '/')
  }
    url <- paste(url, '?c=', apiKey, sep = '')

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



