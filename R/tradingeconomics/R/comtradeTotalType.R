source("R/functions.R")
source("R/login.R")

#'Get detailed information about Comtrade Country Total by Import or Exports from Trading Economics API
#'@import jsonlite
#'@import httr
#'@importFrom utils URLencode
#'@import stringr
#'
#'@export getCmtTotalByType
#'
#'@param country string.
#'String to get data for one country. 
#'@param type string.
#'String to get data for import or export. 
#'@param outType string.
#''df' for data frame,
#''lst'(default) for list.
#'
#'@return Return a list or data frame of Comtrade Total by Import or Export.
#'@section Notes:
#'Without credentials only sample data will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getCalendarData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{
#'getCmtTotalByType(country = 'Portugal', type = 'import', outType = Null )
#'getCmtTotalByType(country = 'United States', type = 'export', outType = NULL )
#'getCmtTotalByType(country = 'Brazil', type = 'import', outType = 'df' ) 
#'}
#'

getCmtTotalByType <- function(country = NULL, type = NULL , outType = NULL){
  api_url_base <- "https://api.tradingeconomics.com/comtrade"
df_final = data.frame()

if(is.null(country)){
  stop("country is missing!")
}
if(is.null(type)){
  stop("type is missing. Choose 'import' or 'export'")
}


if(!is.null(country) & !is.null(type)){
  url <- str_interp("${api_url_base}/${type}/${country}/totals")
}
apikey_local <- .GlobalEnv$apiKey
url <- str_interp("${url}?c=${apikey_local}")
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