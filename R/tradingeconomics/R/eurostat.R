source("R/functions.R")


#'Return search information from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'
#'
#'@export getEurostatData
#'
#'@param lists string.
#'String for eurostats lists, for example lists = 'countries' or lists='categories'.
#'@param category_group string.
#'String for one category_group information, for example category_group = 'Poverty'.
#'@param category string.
#'String for category information, for example category = 'People at risk of income poverty after social transfers'.
#'@param country string.
#'String for eurostats data by country, for example category = 'Denmark'.
#'@param outType string.
#''lst'(default) for list format output, 'df' for data frame,

#'
#'@return Return a list or data frame of all countries or categories available and returns Eurostat data by country/category/category_group.
#'@section Notes:
#'It's necessary to provide some parameter to show data.
#'Without credentials default information will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getEurostatData(lists = 'countries')
#'getEurostatData(lists = 'categories')
#'getEurostatData(country = 'Denmark')
#'getEurostatData(category = 'People at risk of...')
#'getEurostatData(category_group = 'Poverty')
#'getEurostatData(country = 'Denmark', category = 'People ...')
#'getEurostatData(country = 'Denmark', category_group = 'Poverty')
#'}


getEurostatData <- function(lists = NULL, category_group = NULL, category = NULL, country = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com/eurostat"
  df_final = data.frame()
  
  if(!is.null(lists) & is.null(category_group) & is.null(category) & is.null(country)){
    if (lists == 'countries'){
      url <- paste('/countries?')
    }
    else if (lists == 'categories'){
      url <- paste('/categories?')
    }
  }
  
  else if(is.null(lists) & is.null(category_group) & is.null(category) & !is.null(country)){
    url <- paste('/country/',country,'?',sep = '')
  }
  
  else if(is.null(lists) & !is.null(category_group) & is.null(category)){
    if(is.null(country)){
      url <- paste('?category_group=',category_group,'&',sep = '')
    } 
    else if(!is.null(country)){
      url <- paste('/country/',country,'?category_group=',category_group,'&',sep='')
    }
  }
  
  else if(is.null(lists) & is.null(category_group) & !is.null(category)){
    if(is.null(country)){
    url <- paste('?category=',category,'&',sep = '')
    } 
    else if(!is.null(country)){
    url <- paste('/country/',country,'?category=',category,'&',sep='')
    }
  }
  apikey_local <- .GlobalEnv$apiKey
  print(paste('c=',apikey_local, sep = ''))
  url <- paste(base, url, 'c=',apikey_local, sep = '')
  
  url <- URLencode(url)
  
  request <- GET(url)
  
  checkRequestStatus(http_status(request)$message)
  
  
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)
  
  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country,df_final$Category))
    
    
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
      
    }else{
      return(df_final)
      
    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list by country or symbol')
  }
  
  
  return(df_final)
}


#'---------------------------------
#'------ EUROSTAT HISTORICAL ------
#'---------------------------------

#'Return historical information from Trading Economics API.
#'@export getEurostatHistorical
#'
#'@param id string or list.
#'String to get data for one ID historic.
#'@param start_date string with format: YYYY-MM-DD.
#'For example: '2011-01-01'.
#'@param end_date string with format: YYYY-MM-DD.
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of historical information for specific Eurostat ID.
#'@section Notes:
#'An ID must be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}} and \code{\link{getSearch}}
#'@examples
#'\dontrun{ getEurostatHistorical(id = '24804', outType = 'df')
#' getEurostatHistorical(id = '24804', start_date = '2017-01-01')
#'getEurostatHistorical(id = '24804', start_date = '2017-01-01', end_date = '2020-05-05')
#'
#' }


getEurostatHistorical <- function(id = NULL, start_date= NULL, end_date= NULL, outType = NULL ){
  
  base <-  "https://api.tradingeconomics.com/eurostat/historical/"
  df_final = data.frame()
  
  if(is.null(id)){
    stop("An ID is needed!")
  }
  
  if(!is.null(id)){
    url <- paste(base, paste(id, collapse = ','), sep = '/')
    
  }
  apikey_local <- .GlobalEnv$apiKey
  url_base <- paste(url, '?c=', apikey_local, sep = '')
  
  if(!is.null(start_date) & !is.null(end_date)){
    dateCheck(start_date)
    dateCheck(end_date)
    if (start_date > Sys.Date()) stop('Incorrect time period start_date!')
    if (end_date > Sys.Date()) stop('Incorrect time period end_date!')
    if(start_date > end_date) stop('Incorrect time period start_date - end_date!')
    
    url <- paste(url_base, paste(start_date, end_date, sep = '&d2='), sep = '&d1=')
    url_base <- paste(url, '&c=', apikey_local, sep = '')
  }
  else if(!is.null(start_date) & is.null(end_date)){
    dateCheck(start_date)
    if (start_date > Sys.Date())stop('Incorrect time period start_date!')
    url <- paste(url_base, paste(start_date, sep = ''), sep = '&d1=')
    url_base <- paste(url, '&c=', apikey_local, sep = '')
  }
  
  if (is.null(start_date)) {
    url <- url_base
  }
  
  url <- URLencode(url)
  request <- GET(url)
  
  checkRequestStatus(http_status(request)$message)
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)
  
  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$ID))
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
    } else {
      df_final = df_final[order(as.Date(df_final$Date)),]
      rownames(df_final) <- 1:nrow(df_final)
    }
    
  } else {
    stop('output_type options : df for data frame, lst(default) for list by ID')
  }
  
  return(df_final)
}



#'Returns List of List of countries available. from Trading Economics API
#'@export getEurostatCountries
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Returns List of countries available..
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getEurostatCountries(outType = 'df')
#' }
#'

getEurostatCountries <- function(outType = NULL){
  # Final string for the request data
  data_request_url <- ""
  
  #to get global 'apikey' to local function
  apikey_local <- .GlobalEnv$apiKey
  
  # Variables used to create the final string url
  url_base_tag <- "https://api.tradingeconomics.com/eurostat/countries"
  country_tag <- ""
  key_tag <- paste('?c=',apikey_local, sep = '')
  
  df_final = data.frame()
  
  data_request_url <- paste(url_base_tag,key_tag, sep = '')
  print(data_request_url)
  
  
  
  data_request_url <- URLencode(data_request_url)
  
  request <- GET(data_request_url)
  
  checkRequestStatus(http_status(request)$message)
  
  
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)
  
  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country))
    
    
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
      
    }else{
      return(df_final)
      
    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list ')
  }
  
  
  return(df_final)
}


#'Returns List of categories and category groups available.
#'@export getEurostatCategoryGroups
#'
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Returns List of categories and category groups available.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getEurostatCategoryGroups(outType = 'df')
#' }
#'

getEurostatCategoryGroups <- function(outType = NULL){
  # Final string for the request data
  data_request_url <- ""
  
  #to get global 'apikey' to local function
  apikey_local <- .GlobalEnv$apiKey
  
  # Variables used to create the final string url
  url_base_tag <- "https://api.tradingeconomics.com/eurostat/categories"
  country_tag <- ""
  key_tag <- paste('?c=',apikey_local, sep = '')
  
  df_final = data.frame()
  
  data_request_url <- paste(url_base_tag,key_tag, sep = '')
  print(data_request_url)
  
  
  
  data_request_url <- URLencode(data_request_url)
  
  request <- GET(data_request_url)
  
  checkRequestStatus(http_status(request)$message)
  
  
  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))
  
  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)
  
  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$Country))
    
    
  } else if (identical(outType, 'df')){
    if (length(df_final) == 0){
      print ("No data provided for selected parameters")
      
    }else{
      return(df_final)
      
    }
  } else {
    stop('output_type options : df for data frame, lst(default) for list ')
  }
  
  
  return(df_final)
}
