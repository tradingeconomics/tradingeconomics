
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
  base <- "http://api.tradingeconomics.com"
  if (is.null(country) & is.null(indicator)){
    url <- "http://api.tradingeconomics.com/indicators"
  } else if (is.null(country) & !is.null(indicator)){
    stop('Country name should be provided')
  } else if (!is.null(country) & is.null(indicator)){
    url <- paste(base, 'country',
                 paste(country, collapse = ','), sep = '/')
  } else {
    url <- paste(base, 'country', paste(country, collapse = ','),
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

    if (is.null(outType)| identical(outType, 'lst')){
      webResults <- split(webResults , f = paste(webResults$Country,webResults$Category))
    } else if (identical(outType, 'df')){
      webResults = webResults
    } else {
      stop('output_type options : df for data frame, lst(defoult) for list by country ')
    }
  }

  return(webResults)
}


