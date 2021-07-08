source("R/functions.R")

#'Get detailed information about Comtrade Countries filter by type 'import' or 'export' from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'@import stringr
#'
#'@export getCmtCountryFilterByType
#'
#'@param country1 string.
#'String to get data for country1.
#'@param country2 string.
#'String to get data for country2. 
#'@param type string.
#'String to get data for import or export. 
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Get detailed information about Comtrade Countries filter by type 'import' or 'export'
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain',
#' type = 'import', outType = NULL )
#'getCmtCountryFilterByType(country1 = 'United States', 
#'type = 'export', outType = 'df' )
#'}
#'
#'

getCmtCountryFilterByType <- function(country1 = NULL, country2 = NULL, type = NULL, outType = NULL){
  api_url_base <- "https://api.tradingeconomics.com/comtrade/country"
  df_final = data.frame()
  
  if(is.null(country1)){
    stop("country1 is missing!")
  }
  if(is.null(type)){
    stop("type is missing. Choose 'import' or 'export'")
  }
  
  
  if(!is.null(country1) & !is.null(type)){
    if(is.null(country2)){
      url <- str_interp("${api_url_base}/${country1}")
      
    }else{url <- str_interp("${api_url_base}/${country1}/${country2}")}
    
    
  }
  
  apikey_local <- .GlobalEnv$apiKey
  url <- str_interp("${url}?c=${apikey_local}")
  url <- str_interp("${url}&type=${type}")
  url <- str_replace_all(url," ", "%20")
  print(url)
  
  url <- URLencode(url)

  request <- GET(url)

  checkRequestStatus(http_status(request)$message)


  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  df_final = rbind(df_final, webResults)
  Sys.sleep(0.5)

  if (is.null(outType)| identical(outType, 'lst')){
    df_final <- split(df_final , f =  paste(df_final$symbol,df_final$Category))


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