

credCheck <- function(credentials){
  pattern <- "^...............:...............$"
  if (!grepl(pattern, credentials)) stop('Incorrect credentials format!')
}

trim <- function (x) gsub("^\\s+|\\s+$", "", x)


#'Get markets values from Trading Economics API
#'
#'
#' @param marketsField string. Takes either one of 'commodity','currency',
#' 'index' or 'bond' as options.
#' @param outType string.
#''df'(default) for data frame,
#''raw' for list of unparsed data.
#' @param credentials string.
#'User's credentials.
#' @return Returns a list or data frame of available commodities, currencies, indeces or bonds and their latest values.
#'@section Notes:
#'Without credentials only sample information will be provided.
#'@seealso \code{\link{getCalendarData}}, \code{\link{getForecastData}}, \code{\link{getHistoricalData}} and \code{\link{getIndicatorData}}
#'@examples
#'getMarketsData(marketsField = 'index')

getMarketsData <- function(marketsField, outType = NULL, credentials = NULL){
  base <- "http://api.tradingeconomics.com/markets"
  fields <- c('commodities', 'currency', 'index', 'bonds')
  if (!(marketsField %in% fields)){
    stop('Possible values for marketsField are commodities, currency, index or bonds')
  } else {
    url <- paste(base, marketsField, sep = '/')
  }
  if (is.null(credentials)){
    credentials = 'guest:guest'
  } else {
    credCheck(credentials)
  }
  url <- paste(url, '?c=', credentials, sep = '')
  url <- URLencode(url)
  webData <-fromJSON(url)
  webData$Group <- trim(webData$Group)
  if (marketsField == 'bonds'){
    webData$Ticker <- rep(NA, length(webData$Symbol))
  }
  webResults <- data.frame('Symbol' = webData$Symbol,'Ticker' = webData$Ticker,'Name' = webData$Name, 'Country' = webData$Country, 'Date' = webData$Date,
                           'Last' = webData$Last, 'Group' = webData$Group,'URL' = webData$URL,'Importance' = webData$Importance,'DailyChange' = webData$DailyChange,
                           'DailyPercentualChange' = webData$DailyPercentualChange,'WeeklyChange' = webData$WeeklyChange,'WeeklyPercentualChange' = webData$WeeklyPercentualChange,
                           'MonthlyChange' = webData$MonthlyChange,'MonthlyPercentualChange' = webData$MonthlyPercentualChange,'YearlyChange' = webData$YearlyChange,'YearlyPercentualChange' = webData$YearlyPercentualChange,
                           'YTDChange' = webData$YTDChange,'YTDPercentualChange' = webData$YTDPercentualChange,'yesterday' = webData$yesterday,'lastWeek' = webData$lastWeek,'lastMonth' = webData$lastMonth,
                           'lastYear' = webData$lastYear,'startYear' = webData$startYear)
  if (is.null(outType)| identical(outType, 'lst')){
    webResults <- split(webResults , f =paste(webResults$Country,webResults$Group))
  } else if (identical(outType, 'df')){
    webResults = webResults
  } else {
    stop('output_type options : df for data frame, lst(defoult) for list by country ')
  }

  return(webResults)
}




