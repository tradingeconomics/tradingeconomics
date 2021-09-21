source("R/functions.R")

#'Return latest news information from Trading Economics API
#'@export getLatestNews
#'
#'@param country string.
#'@param indicator stirng.
#'@param limit, string.
#'Limits the list size.
#'@param start, string.
#'Specific starting index.
#'@param initDate string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param endDate string with format: YYYY-MM-DD.
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'
#'@section Notes:
#'All parameters are optional. Without parameters a list of all news will be provided exmp('').
#'Without credentials default information will be provided.
#'
#'@return Return a list or data frame of the latest news, by country or countries, by indicator and with page limit and start index number.
#'
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{getLatestNews(outType = 'df')
#'getLatestNews(initDate = '2021-02-02', endDate = '2021-03-03', outType = 'df')
#'getLatestNews(country = c('united states','china') ,outType = 'df')
#'getLatestNews(country = 'united states', initDate = '2021-02-02', endDate = '2021-03-03' ,outType = 'df')
#'getLatestNews(indicator = 'inflation rate' ,outType = 'df')
#'getLatestNews(indicator = 'inflation rate' , initDate = '2021-02-02', endDate = '2021-03-03' ,outType = 'df')
#'getLatestNews(country = 'united states' ,indicator = 'inflation rate' ,outType = 'df')
#'getLatestNews(country = 'united states' ,indicator = 'inflation rate', initDate = '2021-02-02', endDate = '2021-03-03', outType = 'df')
#'getLatestNews(limit='2',start = '1', outType = 'df')
#'}
#'

getLatestNews <- function(country = NULL, indicator = NULL, limit = NULL, start = NULL, initDate= NULL, endDate= NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/news"
  apikey_local <- .GlobalEnv$apiKey
  url <- paste(base,sep ='')
  df_final = data.frame()

  if (length(country) > 1){
    country = paste(country, collapse = ',')
  }
  if (length(indicator) > 1){
    indicator = paste(indicator, collapse = ',')
  }

  if(!is.null(country)) #Handle only with country
  {
      url <- paste(base,"country", paste(country, collapse = ','), sep = '/')
  } 
    
  if(!is.null(indicator)) #Handle only with indicator
    {
      if(!is.null(country)){
        url <- paste(url, paste(indicator, collapse = ','), sep = '/')
      }else{
      url <- paste(base,"indicator", paste(indicator, collapse = ','), sep = '/')
      }
  }

  
  url <- paste(url, '?c=', apikey_local, sep ='')
  
  if(is.null(initDate) & is.null(endDate)){
      if(!is.null(limit) & !is.null(start)){
        url <- paste(url, '&limit=' , paste(limit, collapse = ','), sep = '', paste('&start=', paste(start, collapse = ','), sep = '' ))
      }
  }
  
  if(!is.null(initDate) & !is.null(endDate)){
      url <- paste(url, '&d1=' , paste(initDate, collapse = ','), sep = '', paste('&d2=', paste(endDate, collapse = ','), sep = '' ))
  }
  

  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)


  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$country, df_final$category))
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    }

  } else {
    stop('output_type options : df for data frame, lst(default) for list by symbol')
  }

  return (df_final)
}


#'Return latest articles information from Trading Economics API

#'param country string or list.
#'String for one country information. List of strings for
#'several countrys, for example country = c('country_name', 'country_name').
#'param indicator, string.
#'String for one indicator, or list of strings for several indicators.
#'param id, string.
#'string for a specific Id.
#'param initDate, string.
#'param endDate, string.
#'param limit, string.
#'Limits the list size.
#'param start, string.
#'Specific starting index.
#'param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'
#'section Notes:
#'All parameters are optional. Without parameters a list of all articles will be provided exmp('').
#'Without credentials default information will be provided.
#'
#'return Return a list or data frame of the latest articles, by country or countries, by indicator and with page limit and start index number..
#'seealso code{link{getMarketsData}}, code{link{getForecastData}}, code{link{getHistoricalData}} and code{link{getCalendarData}}
#'examples
#'dontrun{getLatestArticles( )
#'getLatestArticles('United States')
#'getLatestArticles(c('United States', 'Portugal'))
#'getLatestArticles(indicator = 'inflation rate')
#'getLatestArticles( c('United States', 'Portugal'), 'inflation rate')
#'getLatestArticles(limit = '15', start = '10')
#'}
#'


# getLatestArticles <- function(country = NULL, indicator = NULL, id = NULL, limit = NULL, start = NULL, initDate = NULL, endDate = NULL, outType = NULL){
#   base <- "https://api.tradingeconomics.com/articles"
#   base_c <- "https://api.tradingeconomics.com/articles/country"
#   base_i <- "https://api.tradingeconomics.com/articles/indicator"
#   url <- paste(base,sep ='')
#   df_final = data.frame()
# 
#   if(!is.null(country)){
#     url <- paste(base_c, paste(country, collapse = ','), sep = '/')
# 
#   }
#   if(!is.null(indicator)){
#     url <- paste(base_i,  paste(indicator, collapse = ','), sep = '/')
# 
#   }
#   if(!is.null(country) & !is.null(indicator)){
#     url <- paste(base_c, paste(country, collapse = ','),paste(indicator, collapse = ','),sep = '/')
# 
#   }
# 
#   if(!is.null(initDate) & !is.null(endDate)){
#     dateCheck(initDate)
#     dateCheck(endDate)
#     if (initDate > Sys.Date()) stop('Incorrect time period initDate!')
#     if (endDate > Sys.Date()) stop('Incorrect time period endDate!')
#     if(initDate > endDate) stop('Incorrect time period initDate - endDate!')
# 
#     url <- paste(base_c, paste(country, collapse = ','), sep = '/')
#     url <- paste(url, paste(initDate, endDate, sep = '/'), sep = '/from/')
# 
#   }
#   if(!is.null(id)){
#     url <- paste(base, 'id', paste(id, collapse = ','), sep = '/')
# 
#   }
#   apikey_local <- .GlobalEnv$apiKey
#   url <- paste(url, '?c=', apikey_local, sep ='')
# 
#   if(!is.null(limit) & !is.null(start)){
#     url <- paste(url, '&lim=' , paste(limit, collapse = ','), sep = '', paste('&start=', paste(start, collapse = ','), sep = '' ))
# 
#   }
# 
#   url <- URLencode(url)
#   request <- GET(url)
# 
#   checkRequestStatus(http_status(request)$message)
#   webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
#   df_final = rbind(df_final, webResults)
#   Sys.sleep(0.5)
# 
# 
#   if (is.null(outType)| identical(outType, 'lst')){
#     df_final <- split(df_final , f =  paste(df_final$country, df_final$category, df_final$id))
#   } else if (identical(outType, 'df')){
#     if (length(df_final) == 0){
#       print ("No data provided for selected parameters")
#     }
# 
#   } else {
#     stop('output_type options : df for data frame, lst(default) for list by symbol')
#   }
# 
#   return (df_final)
# 
# }
