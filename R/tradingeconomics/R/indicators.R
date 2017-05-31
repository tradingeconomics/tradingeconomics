
#'Return indicators information from Trading Economics API
#'@export getIndicatorData
#'
#'@param country string or list.
#'String for one country information. List of strings for
#'several countrys, for example country = c('country_name', 'country_name').
#'@param indicator string or list.
#'String for one indicator. List of strings for several indicators, for example
#'indicators = 'indicator_name' or
#'indicators = c('indicator_name', 'indicator_name').
#'@param outType string.
#''lst'(default) for lis format output, 'df' for data frame,
#'
#'@return Return a list or dictionary of all indicators, indicators by country or country-indicator pair.
#'@section Notes:
#'All parameters are optional. Without parameters a list of all indicators will be provided.
#'Without credentials default information will be provided.
#'@seealso \code{\link{getMarketsData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getCalendarData}}
#'@examples
#'\dontrun{ getIndicatorData(country = 'United States', indicators = 'Imports', output_type = 'df')
#'getIndicatorData(country = c('United States', 'Portugal'), indicators = c('Imports','Exports'))
#'}


getIndicatorData <- function(country = NULL, indicator = NULL, outType = NULL){
  base <- "https://api.tradingeconomics.com"
  df_final = data.frame()
  step = 10
  for(i in seq(1, length(country), by = step)){
    init = as.numeric(i)
    finit = as.numeric(i)+step
    if (is.null(country) & is.null(indicator)){
      url <- "https://api.tradingeconomics.com/indicators"
    } else if (is.null(country) & !is.null(indicator)){
      stop('Country name should be provided')
    } else if (!is.null(country) & is.null(indicator)){
      url <- paste(base, 'country',
                   paste(country[init:finit], collapse = ','), sep = '/')
    } else {
      url <- paste(base, 'country', paste(country[init:finit], collapse = ','),
                   paste(indicator, collapse = ','), sep = '/')
    }

    url <- paste(url, '?c=', apiKey, sep = '')
    url <- URLencode(url)

    if (class(try(fromJSON(url), silent=TRUE)) == 'try-error') {
      stop('Wrong credentials')
    }

    webData <-fromJSON(url)

    if (is.null(country) & is.null(indicator)){
      webResults <- data.frame('Category' = webData$Category, 'CategoryGroup' = webData$CategoryGroup)
    } else {
      webResults <- data.frame('Country' =webData$Country, 'Category' = webData$Category, 'Title' = webData$Title,  'LatestValue' = webData$LatestValue,
                             'LatestValueDate' = webData$LatestValueDate,  'Source' = webData$Source, 'Unit' = webData$Unit,
                             'URL' = webData$URL, 'CategoryGroup' = webData$CategoryGroup, 'Frequency' = webData$Frequency,
                             'HistoricalDataSymbol' = webData$HistoricalDataSymbol, 'PreviousValue' = webData$PreviousValue,
                             'PreviousValueDate' = webData$PreviousValueDate)
    }
    df_final = rbind(df_final, webResults)
  }
      if (is.null(outType)| identical(outType, 'lst')){
        df_final <- split(df_final , f = paste(df_final$Country,df_final$Category))
      } else if (identical(outType, 'df')){
        df_final = df_final
      } else {
        stop('output_type options : df for data frame, lst(defoult) for list by country ')
      }

  return(df_final)
}


