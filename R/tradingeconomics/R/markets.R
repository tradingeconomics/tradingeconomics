source("R/functions.R")

trim <- function (x) gsub("^\\s+|\\s+$", "", x)



#'Get markets values from Trading Economics API
#'@export getMarketsData
#'
#' @param marketsField string. Takes either one of 'commodity','currency',
#' 'index' or 'bond' as options.
#' @param outType string.
#''df' for data frame,
#''raw'(default) for list of unparsed data.
#'
#' @return Returns a list or data frame of available commodities, currencies, indeces or bonds and their latest values.
#'@section Notes:
#'Without credentials only sample information will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'\dontrun{ getMarketsData(marketsField = 'index')
#'}

getMarketsData <- function(marketsField, outType = NULL){
  base <- "https://api.tradingeconomics.com/markets"
  fields <- c('commodities', 'currency', 'index', 'bond')

  if (!(marketsField %in% fields)){
    stop('Possible values for marketsField are commodities, currency, index or bond')
  } else {
    url <- paste(base, marketsField, sep = '/')
  }

  url <- paste(url, '?c=', apiKey, sep = '')
  url <- URLencode(url)
  request <- GET(url)

  checkRequestStatus(http_status(request)$message)

  webResults <- do.call(rbind.data.frame, checkForNull(content(request)))

  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =paste(webResults$Country,webResults$Group))
  } else if (identical(outType, 'df')){
    webResults = webResults
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country ')
  }

  return(webResults)
}


