// version: 20190621

(function () {
	
	var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {

		var urlObj = JSON.parse(tableau.connectionData)
	
	var dataCategory =  urlObj.urlBase.split('/')[1];
		console.log('DataCategory: ' + dataCategory)

	var dataSecondPoint = urlObj.urlBase.split('/')[2]
	console.log('SecondPoint: ' + dataSecondPoint)

	var dataThirdPoint = urlObj.urlBase.split('/')[3]
	console.log('ThirdPoint: ' + dataThirdPoint)

	if(dataCategory == 'indicators' && dataSecondPoint == null) {
			var cols = [
					{id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
			{id : 'CategoryGroup', alias : 'CategoryGroup', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = {
					id : 'listOfAllIndicators',
					alias : 'Trading Economics Indicators Data',
					columns : cols
		}
	} else if (dataCategory == 'indicators' && dataSecondPoint != null || dataCategory == 'country') {
			var cols = [
					{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
					{id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
					{id : 'Title', alias : 'Title', dataType : tableau.dataTypeEnum.string},
					{id : 'LatestValueDate', alias : 'LatestValueDate', dataType : tableau.dataTypeEnum.date},
					{id : 'LatestValue', alias : 'LatestValue', dataType : tableau.dataTypeEnum.float},
					{id : 'Source', alias : 'Source', dataType : tableau.dataTypeEnum.string},
					{id : 'Unit', alias : 'Unit', dataType : tableau.dataTypeEnum.string},
					{id : 'URL', alias : 'URL', dataType : tableau.dataTypeEnum.string},
			{id : 'CategoryGroup', alias : 'CategoryGroup', dataType : tableau.dataTypeEnum.string},
			{id : 'Adjustment', alias : 'Adjustment', dataType : tableau.dataTypeEnum.string},
					{id : 'Frequency', alias : 'Frequency', dataType : tableau.dataTypeEnum.string},
			{id : 'HistoricalDataSymbol', alias : 'HistoricalDataSymbol', dataType : tableau.dataTypeEnum.string},
			{id : 'CreateDate', alias : 'CreateDate', dataType : tableau.dataTypeEnum.date},
					{id : 'PreviousValue', alias : 'PreviousValue', dataType : tableau.dataTypeEnum.float},
			{id : 'PreviousValueDate', alias : 'PreviousValueDate', dataType : tableau.dataTypeEnum.date}
			]
			var tableInfo = {
					id : 'indicatorsFeed',
					alias : 'Trading Economics Indicators Data',
					columns : cols
			}
	} else if(dataCategory == 'historical') {
			var cols = [
					{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
					{id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
					{id : 'DateTime', alias : 'DateTime', dataType : tableau.dataTypeEnum.datetime},
					{id : 'Value', alias : 'Value', dataType : tableau.dataTypeEnum.float},
					{id : 'Frequency', alias : 'Frequency', dataType : tableau.dataTypeEnum.string},
					{id : 'HistoricalDataSymbol', alias : 'HistoricalDataSymbol', dataType : tableau.dataTypeEnum.string},
					{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.datetime}
			]
			var tableInfo = {
					id : 'historicalFeed',
					alias : 'Trading Economics Historical Data',
					columns : cols
			}
	} else if (dataCategory == 'calendar') {
			var cols = [
			{id : 'CalendarId', alias : 'CalendarId', dataType : tableau.dataTypeEnum.string},
				{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.datetime},
					{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
					{id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
					{id : 'Event', alias : 'Event', dataType : tableau.dataTypeEnum.string},
					{id : 'Reference', alias : 'Reference', dataType : tableau.dataTypeEnum.string},
					{id : 'Source', alias : 'Source', dataType : tableau.dataTypeEnum.string},
					{id : 'Actual', alias : 'Actual', dataType : tableau.dataTypeEnum.float},
					{id : 'Previous', alias : 'Previous', dataType : tableau.dataTypeEnum.string},
					{id : 'Forecast', alias : 'Forecast', dataType : tableau.dataTypeEnum.string},
					{id : 'TEForecast', alias : 'TEForecast', dataType : tableau.dataTypeEnum.string},
			{id : 'URL', alias : 'URL', dataType : tableau.dataTypeEnum.string},
					{id : 'Importance', alias : 'Importance', dataType : tableau.dataTypeEnum.int},
			{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.datetime},
			{id : 'Revised', alias : 'Revised', dataType : tableau.dataTypeEnum.string},
			{id : 'Ticker', alias : 'Ticker', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = { 
					id : 'calendarFeed',
					alias : 'Trading Economics Calendar Data',
					columns : cols
		}
	} else if (dataCategory == 'ratings' && dataSecondPoint != 'historical') {
			var cols = [
			{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
					{id : 'TE', alias : 'TE', dataType : tableau.dataTypeEnum.string},
					{id : 'TE_Outlook', alias : 'TE_Outlook', dataType : tableau.dataTypeEnum.string},
					{id : 'SP', alias : 'SP', dataType : tableau.dataTypeEnum.string},
					{id : 'SP_Outlook', alias : 'SP_Outlook', dataType : tableau.dataTypeEnum.string},
					{id : 'Moodys', alias : 'Moodys', dataType : tableau.dataTypeEnum.string},
					{id : 'Moodys_Outlook', alias : 'Moodys_Outlook', dataType : tableau.dataTypeEnum.string},
					{id : 'Fitch', alias : 'Fitch', dataType : tableau.dataTypeEnum.string},
					{id : 'Fitch_Outlook', alias : 'Fitch_Outlook', dataType : tableau.dataTypeEnum.string},
					{id : 'DBRS', alias : 'DBRS', dataType : tableau.dataTypeEnum.string},
			{id : 'DBRS_Outlook', alias : 'DBRS_Outlook', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = {
					id : 'ratingsFeed',
					alias : 'Trading Economics Ratings Data',
					columns : cols
		}
	} else if (dataCategory == 'ratings' && dataSecondPoint == 'historical') {
			var cols = [
			{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
			{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.date},
					{id : 'Agency', alias : 'Agency', dataType : tableau.dataTypeEnum.string},
					{id : 'Rating', alias : 'Rating', dataType : tableau.dataTypeEnum.string},
					{id : 'Outlook', alias : 'Outlook', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = {
					id : 'ratingsHistoricalFeed',
					alias : 'Trading Economics Ratings Historical Data',
					columns : cols
		}
	} else if (dataCategory == 'updates') {
			var cols = [
			{id : 'HistoricalDataSymbol', alias : 'HistoricalDataSymbol', dataType : tableau.dataTypeEnum.string},
			{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.date}
			]
			var tableInfo = {
					id : 'lastUpdatesFeed',
					alias : 'Trading Economics Last Updates Data',
					columns : cols
			}
		} else if (dataCategory == 'markets' && dataSecondPoint != 'historical' && dataSecondPoint != 'intraday') {
			var cols = [
					{id : 'Symbol', alias : 'Symbol', dataType : tableau.dataTypeEnum.string},
			{id : 'Ticker', alias : 'Ticker', dataType : tableau.dataTypeEnum.string},
			{id : 'Name', alias : 'Name', dataType : tableau.dataTypeEnum.string},
			{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
			{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.datetime},
			{id : 'Last', alias : 'Last', dataType : tableau.dataTypeEnum.float},
			{id : 'URL', alias : 'URL', dataType : tableau.dataTypeEnum.string},
			{id : 'Importance', alias : 'Importance', dataType : tableau.dataTypeEnum.float},
			{id : 'DailyChange', alias : 'DailyChange', dataType : tableau.dataTypeEnum.float},
			{id : 'DailyPercentualChange', alias : 'DailyPercentualChange', dataType : tableau.dataTypeEnum.float},
			{id : 'WeeklyChange', alias : 'WeeklyChange', dataType : tableau.dataTypeEnum.float},
			{id : 'WeeklyPercentualChange', alias : 'WeeklyPercentualChange', dataType : tableau.dataTypeEnum.float},
			{id : 'MonthlyChange', alias : 'MonthlyChange', dataType : tableau.dataTypeEnum.float},
			{id : 'MonthlyPercentualChange', alias : 'MonthlyPercentualChange', dataType : tableau.dataTypeEnum.float},
			{id : 'YearlyChange', alias : 'YearlyChange', dataType : tableau.dataTypeEnum.float},
			{id : 'YearlyPercentualChange', alias : 'YearlyPercentualChange', dataType : tableau.dataTypeEnum.float},
			{id : 'YTDChange', alias : 'YTDChange', dataType : tableau.dataTypeEnum.float},
			{id : 'YTDPercentualChange', alias : 'YTDPercentualChange', dataType : tableau.dataTypeEnum.float},
			{id : 'Yesterday', alias : 'yesterday', dataType : tableau.dataTypeEnum.float},
			{id : 'LastWeek', alias : 'lastWeek', dataType : tableau.dataTypeEnum.float},
			{id : 'LastMonth', alias : 'lastMonth', dataType : tableau.dataTypeEnum.float},
			{id : 'LastYear', alias : 'lastYear', dataType : tableau.dataTypeEnum.float},
			{id : 'StartYear', alias : 'startYear', dataType : tableau.dataTypeEnum.float},
			{id : 'Decimals', alias : 'decimals', dataType : tableau.dataTypeEnum.string},
			{id : 'Unit', alias : 'unit', dataType : tableau.dataTypeEnum.string},
			{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.date}
			]
			var tableInfo = {
					id : 'marketsFeed',
					alias : 'Trading Economics Markets Data',
					columns : cols
		}	
	} else if (dataCategory == 'markets' && dataSecondPoint == 'historical' || dataCategory == 'markets' && dataSecondPoint == 'intraday') {
			var cols = [
					{id : 'Symbol', alias : 'Symbol', dataType : tableau.dataTypeEnum.string},
			{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.date},
			{id : 'Open', alias : 'Open', dataType : tableau.dataTypeEnum.float},
			{id : 'High', alias : 'High', dataType : tableau.dataTypeEnum.float},
			{id : 'Low', alias : 'Low', dataType : tableau.dataTypeEnum.float},
			{id : 'Close', alias : 'Close', dataType : tableau.dataTypeEnum.float}
			]
			var tableInfo = {
					id : 'marketsHistoricalFeed',
					alias : 'Trading Economics Markets Historical Data',
					columns : cols
		}	
	} else if (dataCategory == 'earnings') {
			var cols = [
			{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.date},
			{id : 'Symbol', alias : 'Symbol', dataType : tableau.dataTypeEnum.string},
			{id : 'Type', alias : 'Type', dataType : tableau.dataTypeEnum.string},
			{id : 'Name', alias : 'Name', dataType : tableau.dataTypeEnum.string},
			{id : 'Actual', alias : 'Actual', dataType : tableau.dataTypeEnum.float},
			{id : 'Forecast', alias : 'Forecast', dataType : tableau.dataTypeEnum.float},
			{id : 'FiscalTag', alias :'FiscalTag', dataType : tableau.dataTypeEnum.string},
			{id : 'FiscalReference', alias : 'FiscalReference', dataType : tableau.dataTypeEnum.string},
			{id : 'CalendarReference', alias : 'CalendarReference', dataType : tableau.dataTypeEnum.string},
			{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
			{id : 'Currency', alias : 'Currency', dataType : tableau.dataTypeEnum.string},
			{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.date}
			]
			var tableInfo = {
					id : 'earningsFeed',
					alias : 'Trading Economics Earnings Data',
					columns : cols
		}
	} else if (dataCategory == 'news' || dataCategory == 'articles') {
			var cols = [
			{id : 'Id', alias : 'id', dataType : tableau.dataTypeEnum.string},
			{id : 'Title', alias : 'title', dataType : tableau.dataTypeEnum.string},
			{id : 'Date', alias : 'date', dataType : tableau.dataTypeEnum.date},
			{id : 'Description', alias : 'description', dataType : tableau.dataTypeEnum.string},
			{id : 'Country', alias : 'country', dataType : tableau.dataTypeEnum.string},
			{id : 'Category', alias : 'category', dataType : tableau.dataTypeEnum.string},
			{id : 'Symbol', alias : 'symbol', dataType : tableau.dataTypeEnum.string},
			{id : 'Url', alias : 'url', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = {
					id : 'newsFeed',
					alias : 'Trading Economics News Data',
					columns : cols
			}
		} else if (dataCategory == 'forecast') {
			var cols = [
					{ id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
			{ id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
			{ id : 'Title', alias : 'Title', dataType : tableau.dataTypeEnum.string},
			{ id : 'YearEnd', alias : 'YearEnd', dataType : tableau.dataTypeEnum.float},
			{ id : 'YearTwoEnd', alias : 'YearEnd2', dataType : tableau.dataTypeEnum.float},
			{ id : 'YearThreeEnd', alias : 'YearEnd3', dataType : tableau.dataTypeEnum.float},
			{ id : 'Q1', alias : 'q1', dataType : tableau.dataTypeEnum.float},
			{ id : 'Q2', alias : 'q2', dataType : tableau.dataTypeEnum.float},
			{ id : 'Q3', alias : 'q3', dataType : tableau.dataTypeEnum.float},
			{ id : 'Q4', alias : 'q4', dataType : tableau.dataTypeEnum.float},
			{ id : 'LatestValue', alias : 'LatestValue', dataType : tableau.dataTypeEnum.float},
			{ id : 'LatestValueDate', alias : 'LatestValueDate', dataType : tableau.dataTypeEnum.date},
			{ id : 'Q1Date', alias : 'q1_date', dataType : tableau.dataTypeEnum.date},
			{ id : 'Q2Date', alias : 'q2_date', dataType : tableau.dataTypeEnum.date},
			{ id : 'Q3Date', alias : 'q3_date', dataType : tableau.dataTypeEnum.date},
			{ id : 'Q4Date', alias : 'q4_date', dataType : tableau.dataTypeEnum.date},
			{ id : 'Frequency', alias : 'Frequency', dataType : tableau.dataTypeEnum.string},
			{ id : 'HistoricalDataSymbol', alias : 'HistoricalDataSymbol', dataType : tableau.dataTypeEnum.string}
			]
			var tableInfo = {
					id : 'forecastFeed',
					alias : 'Trading Economics Forecast Data',
					columns : cols
			}
	}
	console.log('JS:FABIO')

	console.log(JSON.stringify(tableInfo))
		schemaCallback([tableInfo])
	}

	myConnector.getData = function (table, doneCallback) {

	console.log('JS:GETDATA')
	var urlObj = JSON.parse(tableau.connectionData)
	console.log(JSON.stringify(urlObj))
	//Final Url is created here
	var apiCall = ''

	if(urlObj.urlAfter == null) {
		apiCall = 'https://api.tradingeconomics.com' + urlObj.urlBase + '?f=json&c=' + urlObj.apiKey
	}
	else {
		apiCall = 'https://api.tradingeconomics.com' + urlObj.urlBase + '?f=json&c=' + urlObj.apiKey + '&' + urlObj.urlAfter
	}

	/*
	var earningsByType = urlObj.urlBase.substring(
		urlObj.urlBase.lastIndexOf("/") + 1, 
		urlObj.urlBase.lastIndexOf("=")
	)
	if(earningsByType == 'earnings?type=') {
		apiCall = 'https://api.tradingeconomics.com' + urlObj.urlBase + '&f=json&c=' + urlObj.apiKey
	} 
	*/

	console.log('apiCallFabio:' + apiCall)

	var dataCategory =  urlObj.urlBase.split('/')[1]
	var dataSecondPoint = 'intraday'
	function capitalizeFirstLetter(_string) {
		
		try {
			var string = _string.toLowerCase()

			var stringToReturn = ""
			var i = 0

			while (true) {
				if (string.split(" ")[i] != undefined) {

					stringToReturn += string.split(" ")[i].charAt(0).toUpperCase() + string.split(" ")[i].substring(1)

					if (string.split(" ")[i + 1] != undefined) {
						stringToReturn += " "
					}
					else {
						return stringToReturn
					}
				}
				i++
			}
		}
		catch(err) {
			//console.log(err)
			return _string
		}
	}

	// Checks if the HTTP status is forbidden(or other fail) before getJSON function
	/*$.ajax({
		type: 'GET',
		url: apiCall
	})
	.fail(function() {
		doneCallback()
	})*/

		$.getJSON(apiCall, function(resp) {

		var tableData = []

		//Atributting value to the columns defined earlier
		for (var i = 0; i < resp.length; i++) {

			if(!resp[i].date) { resp[i].date = ''}
			if(!resp[i].q1_date) { resp[i].q1_date = ''}
			if(!resp[i].q2_date) { resp[i].q2_date = ''}
			if(!resp[i].q3_date) { resp[i].q3_date = ''}
			if(!resp[i].q4_date) { resp[i].q4_date = ''}
			if(!resp[i].PreviousValueDate) { resp[i].PreviousValueDate = ''}
			if(!resp[i].Date) { resp[i].Date = ''}
			if(!resp[i].DateTime) { resp[i].DateTime = ''}
			if(!resp[i].LatestValueDate) { resp[i].LatestValueDate = ''}
			if(!resp[i].CreateDate) { resp[i].CreateDate = ''}
			if(!resp[i].LastUpdate) { resp[i].LastUpdate = ''}
			if(!resp[i].Unit) { resp[i].Unit = ''}
			
			if (dataCategory == 'news' || dataCategory == 'articles') {
				tableData.push({
				'Id' : resp[i].id,
				'Title' : capitalizeFirstLetter(resp[i].title),
				'Date' : resp[i].date.split('T')[0],
				'Description' : resp[i].description,
				'Country' : capitalizeFirstLetter(resp[i].country),
				'Category' : capitalizeFirstLetter(resp[i].category),
				'Symbol' : resp[i].symbol,
				'Url' : resp[i].url,
				})
				continue
			}


			function formatDate(receivedDate) {
				if (receivedDate.length == 0) {
					return receivedDate
									}
				var date = receivedDate
				if (date.indexOf('-') > 0) { date = date.split('-'); }
				else if (date.indexOf('/') > 0) { date = date.split('/'); }

				if (date[date.length - 1].length == 4) {
					var dateObject = new Date(+date[2], date[1] - 1, +date[0]),
						month = '' + (dateObject.getMonth() + 1),
						day = '' + dateObject.getDate(),
						year = dateObject.getFullYear();

					if (month.length < 2) month = '0' + month;
					if (day.length < 2) day = '0' + day;
					return [year, month, day].join('-');
				} else {
					return receivedDate
				}
			}
			var dateToPush
			dateToPush = formatDate(resp[i].Date.split('T')[0]) 

			if (dataCategory == 'markets' && dataSecondPoint == 'intraday') {
				dateToPush = resp[i].Date.replace('T',' ')
							}
		
			console.log("JS:HERE: " + dateToPush)
			tableData.push({
				'Ticker' : resp[i].Ticker,
				'Name'  : capitalizeFirstLetter(resp[i].Name),
				'Symbol' : resp[i].Symbol,
				'CalendarId' : resp[i].CalendarId,
				'Title' : capitalizeFirstLetter(resp[i].Title),
				'CalendarReference' : resp[i].CalendarReference,
				'Country' : capitalizeFirstLetter(resp[i].Country),
				'Category' : capitalizeFirstLetter(resp[i].Category),
				'CategoryGroup' : resp[i].CategoryGroup,
				'Reference' : resp[i].Reference,
				'Event' : resp[i].Event,
				'Currency' : resp[i].Currency,
				'Source' : resp[i].Source,
				'URL' : resp[i].URL,
				'Decimals' : resp[i].decimals,
				'Adjustment' : resp[i].Adjustment,
				'Q1Date' : resp[i].q1_date.split('T')[0],
				'Q2Date' : resp[i].q2_date.split('T')[0],
				'Q3Date' : resp[i].q3_date.split('T')[0],
				'Q4Date' : resp[i].q4_date.split('T')[0],
				'PreviousValueDate' : resp[i].PreviousValueDate.split('T')[0],
				'Date': dateToPush,
				'DateTime': dateToPush,
				'DateHour' : resp[i].Date.replace('T', ' - '),
				'TE' : resp[i].TE,
				'TE_Outlook' : resp[i].TE_Outlook,
				'SP' : resp[i].SP,
				'SP_Outlook' : resp[i].SP_Outlook,
				'Moodys' : resp[i].Moodys,
				'Moodys_Outlook' : resp[i].Moodys_Outlook,
				'Fitch' : resp[i].Fitch,
				'Fitch_Outlook' : resp[i].Fitch_Outlook,
				'DBRS' : resp[i].DBRS,
				'DBRS_Outlook' : resp[i].DBRS_Outlook,
				'Last' : resp[i].Last,
				'Actual' : resp[i].Actual,
				'Importance' : resp[i].Importance,
				'Value' : resp[i].Value,
				'LatestValueDate' : resp[i].LatestValueDate.split('T')[0],
				'LatestValue' : resp[i].LatestValue,
				'Revised' : resp[i].Revised,
				'Agency' : resp[i].Agency,
				'Rating' : resp[i].Rating,
				'Outlook' : resp[i].Outlook,
				'Previous' : resp[i].Previous,
				'DailyChange' : resp[i].DailyChange,
				'DailyPercentualChange' : resp[i].DailyPercentualChange,
				'WeeklyChange' : resp[i].WeeklyChange,
				'WeeklyPercentualChange' : resp[i].WeeklyPercentualChange,
				'MonthlyChange' : resp[i].MonthlyChange,
				'MonthlyPercentualChange' : resp[i].MonthlyPercentualChange,
				'YearlyChange' : resp[i].YearlyChange,
				'YearlyPercentualChange' : resp[i].YearlyPercentualChange,
				'YTDChange' : resp[i].YTDChange,
				'YTDPercentualChange' : resp[i].YTDPercentualChange,
				'Yesterday' : resp[i].yesterday,
				'LastWeek' : resp[i].lastWeek,
				'LastMonth' : resp[i].lastMonth,
				'LastYear' : resp[i].lastYear,
				'StartYear' : resp[i].startYear,
				'PreviousValue' : resp[i].PreviousValue,
				'Forecast' : resp[i].Forecast,
				'TEForecast' : resp[i].TEForecast,
				'YearEnd' : resp[i].YearEnd,
				'YearTwoEnd' : resp[i].YearEnd2,
				'YearThreeEnd' : resp[i].YearEnd3,
				'Q1' : resp[i].q1,
				'Q2' : resp[i].q2,
				'Q3' : resp[i].q3,
				'Q4' : resp[i].q4,
				'Unit' : String(resp[i].Unit),
				'Open' : resp[i].Open,
				'High' : resp[i].High,
				'Low' : resp[i].Low,
				'Close' : resp[i].Close,
				'Frequency' : resp[i].Frequency,
				'HistoricalDataSymbol' : resp[i].HistoricalDataSymbol,
				'CreateDate' : resp[i].CreateDate.split('T')[0],
				'LastUpdate': resp[i].LastUpdate.split('T')[0],
				'FiscalTag'  : resp[i].FiscalTag,
				'FiscalReference' : resp[i].FiscalReference,
				'Type'  : resp[i].Type,
				'Description' : resp[i].description
			})
		}	
		table.appendRows(tableData)
		doneCallback()
	})
	//doneCallback()
}

	tableau.registerConnector(myConnector)

	$(document).ready(function() {

	var inputsID = ['indicatorInput', 'countryInput', 'tickerInput', 'calendarIdInput', 'currencyISOInput', 'marketSymbolInput', 'dateFromOneInput', 'dateFromInput', 'dateToInput', 'earningsTypeInput', 'startIndexInput', 'listSizeInput', 'articleIdInput', 'hourInput']
	var inputsSelected = []

	//Selecting Input Fields
	for (var i in inputsID) {
		inputsSelected[i] = document.getElementById(inputsID[i])
	}

	var urlToBakeCode = ''

	var submitButton = document.getElementById('submitButton')
	submitButton.onclick = function() { 

		var _baseUrl = ''
		var _urlAfter = null

		for(var i in inputsSelected) {
			inputsSelected[i].value = inputsSelected[i].value.trim()
		}

		//Creating the specific url's foreach case
		//Indicators
		if (urlToBakeCode == 'getEveryTeApiIndicatorName') { _baseUrl = '/indicators' }
		else if (urlToBakeCode == 'getEveryIndicatorOfaCountry') { _baseUrl = '/country/' + inputsSelected[1].value } 
		else if (urlToBakeCode == 'getThatIndicatorForAllCountries') { _baseUrl = '/country/all/' + inputsSelected[0].value } 
		else if (urlToBakeCode == 'getSpecificCountriesAndIndicators') { _baseUrl = '/historical/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getSpecificCountriesAndIndicatorsStartingFromaDate') { _baseUrl = '/historical/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value + '/' + inputsSelected[6].value }
		else if (urlToBakeCode == 'getSpecificCountriesAndIndicatorsFromDateToDate') { _baseUrl = '/historical/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value + '/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getDataByTicker') { _baseUrl = '/historical/ticker/' + inputsSelected[2].value + '/' + inputsSelected[6].value }
		else if (urlToBakeCode == 'getCountryRating') { _baseUrl = '/ratings/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getCountryHistoricalRating') { _baseUrl = '/ratings/historical/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getAllUpdates') { _baseUrl = '/updates' }
		else if (urlToBakeCode == 'getUpdatesStartingFromADate') { _baseUrl = '/updates/' + inputsSelected[6].value }
		//Calendar
		else if (urlToBakeCode == 'getAllCalendarEvents') { _baseUrl = '/calendar' }
		else if (urlToBakeCode == 'getCalendarEventsFromDateToDate') { _baseUrl = '/calendar/country/All/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificCountries') { _baseUrl = '/calendar/country/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesFromDateToDate') { _baseUrl = '/calendar/country/' + inputsSelected[1].value + '/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificIndicator') { _baseUrl = '/calendar/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificIndicatorFromDateToDate') { _baseUrl = '/calendar/indicator/' + inputsSelected[0].value + '/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesAndIndicators') { _baseUrl = '/calendar/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate') { _baseUrl = '/calendar/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value + '/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getCalendarEventsByCalendarId') { _baseUrl = '/calendar/calendarid/' + inputsSelected[3].value }
		//Forecast
		else if (urlToBakeCode == 'getForecastsForSpecificCountries') { _baseUrl = '/forecast/country/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getForecastsForSpecificIndicator') { _baseUrl = '/forecast/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getForecastsForSpecificCountriesAndIndicators') { _baseUrl = '/forecast/country/' + inputsSelected[1].value + '/indicator/' + inputsSelected[0].value }
		//Markets
		else if (urlToBakeCode == 'getCommodities') { _baseUrl = '/markets/commodities' }
		else if (urlToBakeCode == 'getMajorCurrencies') { _baseUrl = '/markets/currency' }
		else if (urlToBakeCode == 'getCurrencyCrosses') {_baseUrl = '/markets/currency', _urlAfter = 'cross=' + inputsSelected[4].value }
		else if (urlToBakeCode == 'getStockMarketIndexes') { _baseUrl = '/markets/index' }
		else if (urlToBakeCode == 'getGovernmentBonds') { _baseUrl = '/markets/bond' }
		else if (urlToBakeCode == 'getSpecificMarketsBySymbol') { _baseUrl = '/markets/symbol/' + inputsSelected[5].value }
		else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbol') { _baseUrl = '/markets/historical/' + inputsSelected[5].value }
		else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbolStartingFromDate') { _baseUrl = '/markets/historical/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[6].value }
		else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbolFromDateToDate') { _baseUrl = '/markets/historical/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[7].value + '&d2=' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getIntradayPricesByMarketSymbol') { _baseUrl = '/markets/intraday/' + inputsSelected[5].value }
		else if (urlToBakeCode == 'getIntradayPricesByMarketSymbolStartingFromDateAndHour') { _baseUrl = '/markets/intraday/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[6].value + ' ' + inputsSelected[13].value }
		else if (urlToBakeCode == 'getIntradayPricesByMarketSymbolFromDateToDate') { _baseUrl = '/markets/intraday/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[7].value + 'd2=' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getLatestPeersPricesByMarketSymbol') { _baseUrl = '/markets/peers/' + inputsSelected[5].value }
		else if (urlToBakeCode == 'getStockMarketsIndexComponentsbySymbol') { _baseUrl = '/markets/components/' + inputsSelected[5].value }
		//Earnings
		else if (urlToBakeCode == 'getDefaultEarningsCalendar') { _baseUrl = '/earnings' }
		else if (urlToBakeCode == 'getEarningsCalendarStartingFromDate') { _baseUrl = '/earnings', _urlAfter = 'd1=' + inputsSelected[6].value }
		else if (urlToBakeCode == 'getEarningsCalendarByMarketStartingFromDate') { _baseUrl = '/earnings/symbol/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[6].value }
		else if (urlToBakeCode == 'getEarningsCalendarByMarketFromDateToDate') { _baseUrl = '/earnings/symbol/' + inputsSelected[5].value, _urlAfter = 'd1=' + inputsSelected[7].value + '&d2=' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getEarningsCalendarByCountry') { _baseUrl = '/earnings/country/' + inputsSelected[1].value }
		//else if (urlToBakeCode == 'getEarningsByType') { _baseUrl = '/earnings?type=' + inputsSelected[9].value }
		//News
		else if (urlToBakeCode == 'getLatestNews') { _baseUrl = '/news' }
		else if (urlToBakeCode == 'getNewsByCountry') { _baseUrl = '/news/country/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getNewsByIndicator') { _baseUrl = '/news/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getNewsByCountryAndIndicator') { _baseUrl = '/news/country/' + inputsSelected[1].value + '/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getNewsListSpecifyingStartIndexAndListSize') { _baseUrl = '/news', _urlAfter = 'limit=' + inputsSelected[11].value + '&start=' + inputsSelected[10].value }
		else if (urlToBakeCode == 'getLatestArticles') { _baseUrl = '/articles' }
		else if (urlToBakeCode == 'getArticlesByCountry') { _baseUrl = '/articles/country/' + inputsSelected[1].value }
		else if (urlToBakeCode == 'getArticlesByCountryFromDateToDate') { _baseUrl = '/articles/country/' + inputsSelected[1].value + '/from/' + inputsSelected[7].value + '/' + inputsSelected[8].value }
		else if (urlToBakeCode == 'getLatestArticlesByIndicator') { _baseUrl = '/articles/indicator/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getLatestArticlesByCountryAndIndicator') { _baseUrl = '/articles/country/' + inputsSelected[1].value + '/' + inputsSelected[0].value }
		else if (urlToBakeCode == 'getArticlesById') { _baseUrl = '/articles/id/' + inputsSelected[12].value }
		else if (urlToBakeCode == 'getArticlesListSpecifyingStartIndexAndListSize') { _baseUrl = '/articles', _urlAfter = 'lim=' + inputsSelected[11].value + '&start=' + inputsSelected[10].value }

		//This object will further complete the url with the API Key 
		var urlObj = {
			urlBase: _baseUrl,
			apiKey: $('#apiKeyInput').val().trim(),
			urlAfter: _urlAfter
		}

		tableau.connectionData = JSON.stringify(urlObj)
		tableau.connectionName = "Trading Economics"
		tableau.submit()
	}

	//DOM Selections
	var indicatorsHr = document.getElementById('indicatorsHr')
	var marketsHr = document.getElementById('marketsHr')
	var newsHr = document.getElementById('newsHr')
	var gettingWhatHr = document.getElementById('gettingWhatHr')
	var gettingWhatTitle = document.getElementById('gettingWhatTitle')
	var dateFromOneInputLabel = document.getElementById('dateFromOneInputLabel')
	var apiKeyInput = document.getElementById('apiKeyInput')
	//Indicators
	var indicatorsContainer = document.getElementById('indicatorsContainer')
	var allIndicatorsBtn = document.getElementById('allIndicatorsBtn')
	var allIndicatorsBtnContainer = document.getElementById('allIndicatorsBtnContainer')
	var historicalDataBtn = document.getElementById('historicalDataBtn')
	var historicalDataBtnContainer = document.getElementById('historicalDataBtnContainer')
	var creditRatingBtn = document.getElementById('creditRatingBtn')
	var creditRatingBtnContainer = document.getElementById('creditRatingBtnContainer')
	var updatesBtn = document.getElementById('updatesBtn')
	var updatesBtnContainer = document.getElementById('updatesBtnContainer')
	var getEveryTeApiIndicatorName = document.getElementById('getEveryTeApiIndicatorName')
	var getEveryIndicatorOfaCountry = document.getElementById('getEveryIndicatorOfaCountry')
	var getThatIndicatorForAllCountries = document.getElementById('getThatIndicatorForAllCountries')
	var getSpecificCountriesAndIndicators = document.getElementById('getSpecificCountriesAndIndicators')
	var getSpecificCountriesAndIndicatorsStartingFromaDate = document.getElementById('getSpecificCountriesAndIndicatorsStartingFromaDate')
	var getSpecificCountriesAndIndicatorsFromDateToDate = document.getElementById('getSpecificCountriesAndIndicatorsFromDateToDate')
	var getDataByTicker = document.getElementById('getDataByTicker')
	var getCountryRating = document.getElementById('getCountryRating')
	var getCountryHistoricalRating = document.getElementById('getCountryHistoricalRating')
	var getAllUpdates = document.getElementById('getAllUpdates')
	var getUpdatesStartingFromADate = document.getElementById('getUpdatesStartingFromADate')
	//Calendar
	var calendarContainer = document.getElementById('calendarContainer')
	var getAllCalendarEvents = document.getElementById('getAllCalendarEvents')
	var getCalendarEventsFromDateToDate = document.getElementById('getCalendarEventsFromDateToDate')
	var getCalendarEventsForSpecificCountries = document.getElementById('getCalendarEventsForSpecificCountries')
	var getCalendarEventsForSpecificCountriesFromDateToDate = document.getElementById('getCalendarEventsForSpecificCountriesFromDateToDate')
	var getCalendarEventsForSpecificIndicator = document.getElementById('getCalendarEventsForSpecificIndicator')
	var getCalendarEventsForSpecificIndicatorFromDateToDate = document.getElementById('getCalendarEventsForSpecificIndicatorFromDateToDate')
	var getCalendarEventsForSpecificCountriesAndIndicators = document.getElementById('getCalendarEventsForSpecificCountriesAndIndicators')
	var getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate = document.getElementById('getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate')
	var getCalendarEventsByCalendarId = document.getElementById('getCalendarEventsByCalendarId')
	//Forecast
	var forecastContainer = document.getElementById('forecastContainer')
	var getForecastsForSpecificCountries = document.getElementById('getForecastsForSpecificCountries')
	var getForecastsForSpecificIndicator = document.getElementById('getForecastsForSpecificIndicator')
	var getForecastsForSpecificCountriesAndIndicators = document.getElementById('getForecastsForSpecificCountriesAndIndicators')
	//Markets
	var marketsContainer = document.getElementById('marketsContainer')
	var snapshotsBtn = document.getElementById('snapshotsBtn')
	var snapshotsBtnContainer = document.getElementById('snapshotsBtnContainer')
	var historicalDataMarketsBtn = document.getElementById('historicalDataMarketsBtn')
	var historicalDataMarketsBtnContainer = document.getElementById('historicalDataMarketsBtnContainer')
	var intradayDataBtn = document.getElementById('intradayDataBtn')
	var intradayDataBtnContainer = document.getElementById('intradayDataBtnContainer')
	var marketListsBtn = document.getElementById('marketListsBtn')
	var marketListsBtnContainer = document.getElementById('marketListsBtnContainer')
	var getCommodities = document.getElementById('getCommodities')
	var getMajorCurrencies = document.getElementById('getMajorCurrencies')
	var getCurrencyCrosses = document.getElementById('getCurrencyCrosses')
	var getStockMarketIndexes = document.getElementById('getStockMarketIndexes')
	var getGovernmentBonds = document.getElementById('getGovernmentBonds')
	var getSpecificHistoricalMarketsDataBySymbol = document.getElementById('getSpecificHistoricalMarketsDataBySymbol')
	var getSpecificHistoricalMarketsDataBySymbolStartingFromDate = document.getElementById('getSpecificHistoricalMarketsDataBySymbolStartingFromDate')
	var getSpecificHistoricalMarketsDataBySymbolFromDateToDate = document.getElementById('getSpecificHistoricalMarketsDataBySymbolFromDateToDate')
	var getIntradayPricesByMarketSymbol = document.getElementById('getIntradayPricesByMarketSymbol')
	var getIntradayPricesByMarketSymbolStartingFromDateAndHour = document.getElementById('getIntradayPricesByMarketSymbolStartingFromDateAndHour')
	var getIntradayPricesByMarketSymbolFromDateToDate = document.getElementById('getIntradayPricesByMarketSymbolFromDateToDate')
	var getLatestPeersPricesByMarketSymbol = document.getElementById('getLatestPeersPricesByMarketSymbol')
	var getStockMarketsIndexComponentsbySymbol = document.getElementById('getStockMarketsIndexComponentsbySymbol')
	//Earnings
	var earningsContainer = document.getElementById('earningsContainer')
	var getDefaultEarningsCalendar = document.getElementById('getDefaultEarningsCalendar')
	var getEarningsCalendarStartingFromDate = document.getElementById('getEarningsCalendarStartingFromDate')
	var getEarningsCalendarByMarketStartingFromDate = document.getElementById('getEarningsCalendarByMarketStartingFromDate')
	var getEarningsCalendarByMarketFromDateToDate = document.getElementById('getEarningsCalendarByMarketFromDateToDate')
	var getEarningsCalendarByCountry = document.getElementById('getEarningsCalendarByCountry')
	var getEarningsByType = document.getElementById('getEarningsByType')
	//News
	var newsContainer = document.getElementById('newsContainer')
	var latestNewsBtn = document.getElementById('latestNewsBtn')
	var latestNewsBtnContainer = document.getElementById('latestNewsBtnContainer')
	var lastestArticlesBtn = document.getElementById('lastestArticlesBtn')
	var lastestArticlesBtnContainer = document.getElementById('lastestArticlesBtnContainer')
	var getLatestNews = document.getElementById('getLatestNews')
	var getNewsByCountry = document.getElementById('getNewsByCountry')
	var getNewsByIndicator = document.getElementById('getNewsByIndicator')
	var getNewsByCountryAndIndicator = document.getElementById('getNewsByCountryAndIndicator')
	var getNewsListSpecifyingStartIndexAndListSize = document.getElementById('getNewsListSpecifyingStartIndexAndListSize')
	var getLatestArticles = document.getElementById('getLatestArticles')
	var getArticlesByCountry = document.getElementById('getArticlesByCountry')
	var getArticlesByCountryFromDateToDate = document.getElementById('getArticlesByCountryFromDateToDate')
	var getLatestArticlesByIndicator = document.getElementById('getLatestArticlesByIndicator')
	var getLatestArticlesByCountryAndIndicator = document.getElementById('getLatestArticlesByCountryAndIndicator')
	var getArticlesById = document.getElementById('getArticlesById')
	var getArticlesListSpecifyingStartIndexAndListSize = document.getElementById('getArticlesListSpecifyingStartIndexAndListSize')
	//Input/Form Containers
	var indicatorInputContainer = document.getElementById('indicatorInputContainer')
	var countryInputContainer = document.getElementById('countryInputContainer')
	var tickerInputContainer = document.getElementById('tickerInputContainer')
	var calendarIdInputContainer = document.getElementById('calendarIdInputContainer')
	var currencyISOInputContainer = document.getElementById('currencyISOInputContainer')
	var marketSymbolInputContainer = document.getElementById('marketSymbolInputContainer')
	var dateFromOneInputContainer = document.getElementById('dateFromOneInputContainer')
	var dateFromToInputContainer = document.getElementById('dateFromToInputContainer')
	var earningsTypeInputContainer = document.getElementById('earningsTypeInputContainer')
	var startIndexListSizeInputContainer = document.getElementById('startIndexListSizeInputContainer')
	var articleIdInputContainer = document.getElementById('articleIdInputContainer')
	var hourInputContainer = document.getElementById('hourInputContainer')
	var apiKeyInputContainer = document.getElementById('apiKeyInputContainer')

	//Hide Everything
	function hideContainers() {
		indicatorsContainer.style.display = 'none'
		allIndicatorsBtnContainer.style.display = 'none'
		historicalDataBtnContainer.style.display = 'none'
		creditRatingBtnContainer.style.display = 'none'
		updatesBtnContainer.style.display = 'none'
		calendarContainer.style.display = 'none'
		forecastContainer.style.display = 'none'
		marketsContainer.style.display = 'none'
		snapshotsBtnContainer.style.display = 'none'
		historicalDataMarketsBtnContainer.style.display = 'none'
		intradayDataBtnContainer.style.display = 'none'
		marketListsBtnContainer.style.display = 'none'
		earningsContainer.style.display = 'none'
		newsContainer.style.display = 'none'
		latestNewsBtnContainer.style.display = 'none'
		lastestArticlesBtnContainer.style.display = 'none'
	}

	function hideCleanInputFields() {
		//Hide Input Fields
		gettingWhatHr.style.display = 'none'
		gettingWhatTitle.textContent = ''
		indicatorInputContainer.style.display = 'none'
		countryInputContainer.style.display = 'none'
		tickerInputContainer.style.display = 'none'
		calendarIdInputContainer.style.display = 'none'
		currencyISOInputContainer.style.display = 'none'
		marketSymbolInputContainer.style.display = 'none'
		dateFromOneInputContainer.style.display = 'none'
		dateFromToInputContainer.style.display = 'none'
		earningsTypeInputContainer.style.display = 'none'
		startIndexListSizeInputContainer.style.display = 'none'
		articleIdInputContainer.style.display = 'none'
		hourInputContainer.style.display = 'none'
		apiKeyInputContainer.style.display = 'none'
		submitButton.style.display = 'none'
		//Defaulting Input Fields
		indicatorInput.value = 'GDP, Consumer Confidence, Unemployment Rate'
		countryInput.value = 'United States, United Kingdom, Australia'
		tickerInput.value = 'USURTOT'
		calendarIdInput.value = '174108, 160025, 160030'
		currencyISOInput.value = 'EUR'
		marketSymbolInput.value = 'AAPL:US, INDU:IND, MSFT:US'
		dateFromOneInput.value = '2014-12-31'
		dateFromInput.value = '2007-12-31'
		dateToInput.value = '2017-12-31'
		earningsTypeInput.value = 'Earnings'
		startIndexInput.value = '10'
		listSizeInput.value = '15'
		articleIdInput.value = '20580'

		dateFromOneInputLabel.textContent = 'Starting From Date'
		
		$('*').removeClass('pressedBtnGray')
	}

	//Setting What Input Fields to Show foreach Button
	function eachButtonSetup(thisButton, _indicatorInputContainer, _countryInputContainer, _tickerInputContainer, _calendarIdInputContainer, _currencyISOInputContainer, _marketSymbolInputContainer, _dateFromOneInputContainer, _dateFromToInputContainer, _earningsTypeInputContainer, _startIndexListSizeInputContainer, _articleIdInputContainer, _hourInputContainer) {
		hideCleanInputFields()
		gettingWhatHr.style.display = 'block'
		gettingWhatTitle.textContent = thisButton.textContent
		apiKeyInputContainer.style.display = 'block'
		submitButton.style.display = 'block'
		urlToBakeCode = thisButton.id
		thisButton.classList.add('pressedBtnGray')
		
		if (_indicatorInputContainer != '') { indicatorInputContainer.style.display = _indicatorInputContainer } //Param: 2
		if (_countryInputContainer != '') { countryInputContainer.style.display = _countryInputContainer } //Param: 3
		if (_tickerInputContainer != '') { tickerInputContainer.style.display = _tickerInputContainer } //Param: 4
		if (_calendarIdInputContainer != '') { calendarIdInputContainer.style.display = _calendarIdInputContainer } //Param: 5
		if (_currencyISOInputContainer != '') { currencyISOInputContainer.style.display = _currencyISOInputContainer } //Param: 6
		if (_marketSymbolInputContainer != '') { marketSymbolInputContainer.style.display = _marketSymbolInputContainer } //Param: 7
		if (_dateFromOneInputContainer != '') { dateFromOneInputContainer.style.display = _dateFromOneInputContainer } //Param: 8
		if (_dateFromToInputContainer != '') { dateFromToInputContainer.style.display = _dateFromToInputContainer } //Param: 9
		if (_earningsTypeInputContainer != '') { earningsTypeInputContainer.style.display = _earningsTypeInputContainer } //Param: 10
		if (_startIndexListSizeInputContainer != '') { startIndexListSizeInputContainer.style.display = _startIndexListSizeInputContainer } //Param: 11
		if (_articleIdInputContainer != '') { articleIdInputContainer.style.display = _articleIdInputContainer } //Param: 12
		if (_hourInputContainer != '') { hourInputContainer.style.display = _hourInputContainer } //Param: 13
	}

	hideContainers()
	hideCleanInputFields()

	function buttonStyle(btn) {
		$('*').removeClass('pressedBtnBlue')
		btn.classList.add('pressedBtnBlue')
		hideCleanInputFields()
	}

	//This code block runs when the selected method changes
	//Here are defined what buttons to be shown depending on the selected method
		$('.dropdown-item').click(function() {
		
		methodValue = this.value

		var dropDownButton = document.getElementById('method')
		dropDownButton.textContent = this.textContent

		hideContainers()
		hideCleanInputFields()

		$('*').removeClass('pressedBtnBlue')

		if (methodValue == 'indicators') {
			indicatorsContainer.style.display = 'block'

			allIndicatorsBtnContainer.style.display = 'none'
			historicalDataBtnContainer.style.display = 'none'
			creditRatingBtnContainer.style.display = 'none'
			updatesBtnContainer.style.display = 'none'

			indicatorsHr.style.display = 'none'

			allIndicatorsBtn.onclick = function() {
				buttonStyle(allIndicatorsBtn)
				indicatorsHr.style.display = 'block'
				allIndicatorsBtnContainer.style.display = 'block'
				historicalDataBtnContainer.style.display = 'none'
				creditRatingBtnContainer.style.display = 'none'
				updatesBtnContainer.style.display = 'none'
			}

			historicalDataBtn.onclick = function() {
				buttonStyle(historicalDataBtn)
				indicatorsHr.style.display = 'block'
				allIndicatorsBtnContainer.style.display = 'none'
				historicalDataBtnContainer.style.display = 'block'
				creditRatingBtnContainer.style.display = 'none'
				updatesBtnContainer.style.display = 'none'
			}

			creditRatingBtn.onclick = function() {
				buttonStyle(creditRatingBtn)
				indicatorsHr.style.display = 'block'
				allIndicatorsBtnContainer.style.display = 'none'
				historicalDataBtnContainer.style.display = 'none'
				creditRatingBtnContainer.style.display = 'block'
				updatesBtnContainer.style.display = 'none'
			}

			updatesBtn.onclick = function() {
				buttonStyle(updatesBtn)
				indicatorsHr.style.display = 'block'
				allIndicatorsBtnContainer.style.display = 'none'
				historicalDataBtnContainer.style.display = 'none'
				creditRatingBtnContainer.style.display = 'none'
				updatesBtnContainer.style.display = 'block'
			}

			getEveryTeApiIndicatorName.onclick = function() { eachButtonSetup(getEveryTeApiIndicatorName) }
			getEveryIndicatorOfaCountry.onclick = function() { eachButtonSetup(getEveryIndicatorOfaCountry, '', 'block') }
			getThatIndicatorForAllCountries.onclick = function() { eachButtonSetup(getThatIndicatorForAllCountries, 'block') }
			getSpecificCountriesAndIndicators.onclick = function() { eachButtonSetup(getSpecificCountriesAndIndicators, 'block', 'block') }
			getSpecificCountriesAndIndicatorsStartingFromaDate.onclick = function() { eachButtonSetup(getSpecificCountriesAndIndicatorsStartingFromaDate, 'block', 'block', '', '', '', '', 'block') }
			getSpecificCountriesAndIndicatorsFromDateToDate.onclick = function() { eachButtonSetup(getSpecificCountriesAndIndicatorsFromDateToDate, 'block', 'block', '', '', '', '', '', 'block') }
			getDataByTicker.onclick = function() { eachButtonSetup(getDataByTicker, '', '', 'block', '', '', '', 'block') }
			getCountryRating.onclick = function() { eachButtonSetup(getCountryRating, '', 'block') }
			getCountryHistoricalRating.onclick = function() { eachButtonSetup(getCountryHistoricalRating, '', 'block') }
			getAllUpdates.onclick = function() { eachButtonSetup(getAllUpdates) }
			getUpdatesStartingFromADate.onclick = function() { eachButtonSetup(getUpdatesStartingFromADate, '', '', '', '', '', '', 'block') }
		}

		else if (methodValue == 'calendar') {
			calendarContainer.style.display = "block"

			getAllCalendarEvents.onclick = function() { eachButtonSetup(getAllCalendarEvents) }
			getCalendarEventsFromDateToDate.onclick = function() { eachButtonSetup(getCalendarEventsFromDateToDate, '', '', '', '', '', '', '', 'block') }
			getCalendarEventsForSpecificCountries.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificCountries, '', 'block') }
			getCalendarEventsForSpecificCountriesFromDateToDate.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificCountriesFromDateToDate, '', 'block', '', '', '', '', '', 'block') }
			getCalendarEventsForSpecificIndicator.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificIndicator, 'block') }
			getCalendarEventsForSpecificIndicatorFromDateToDate.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificIndicatorFromDateToDate, 'block', '', '', '', '', '', '', 'block') }
			getCalendarEventsForSpecificCountriesAndIndicators.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificCountriesAndIndicators, 'block', 'block') }
			getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate.onclick = function() { eachButtonSetup(getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate, 'block', 'block', '', '', '', '', '', 'block') }
			getCalendarEventsByCalendarId.onclick = function() { eachButtonSetup(getCalendarEventsByCalendarId, '', '', '', 'block') }
		}

		else if (methodValue == 'forecast') {
			forecastContainer.style.display = "block"

			getForecastsForSpecificCountries.onclick = function() { eachButtonSetup(getForecastsForSpecificCountries, '', 'block') }
			getForecastsForSpecificIndicator.onclick = function() { eachButtonSetup(getForecastsForSpecificIndicator, 'block') }
			getForecastsForSpecificCountriesAndIndicators.onclick = function() { eachButtonSetup(getForecastsForSpecificCountriesAndIndicators, 'block', 'block') }
		}

		else if (methodValue == 'markets') {
			marketsContainer.style.display = 'block'

			snapshotsBtnContainer.style.display = 'none'
			historicalDataMarketsBtnContainer.style.display = 'none'
			intradayDataBtnContainer.style.display = 'none'
			marketListsBtnContainer.style.display = 'none'

			marketsHr.style.display = 'none'

			snapshotsBtn.onclick = function() {
				buttonStyle(snapshotsBtn)
				marketsHr.style.display = 'block'
				snapshotsBtnContainer.style.display = 'block'
				historicalDataMarketsBtnContainer.style.display = 'none'
				intradayDataBtnContainer.style.display = 'none'
				marketListsBtnContainer.style.display = 'none'
			}

			historicalDataMarketsBtn.onclick = function() {
				buttonStyle(historicalDataMarketsBtn)
				marketsHr.style.display = 'block'
				snapshotsBtnContainer.style.display = 'none'
				historicalDataMarketsBtnContainer.style.display = 'block'
				intradayDataBtnContainer.style.display = 'none'
				marketListsBtnContainer.style.display = 'none'
			}

			intradayDataBtn.onclick = function() {
				buttonStyle(intradayDataBtn)
				marketsHr.style.display = 'block'
				snapshotsBtnContainer.style.display = 'none'
				historicalDataMarketsBtnContainer.style.display = 'none'
				intradayDataBtnContainer.style.display = 'block'
				marketListsBtnContainer.style.display = 'none'
			}

			marketListsBtn.onclick = function() {
				buttonStyle(marketListsBtn)
				marketsHr.style.display = 'block'
				snapshotsBtnContainer.style.display = 'none'
				historicalDataMarketsBtnContainer.style.display = 'none'
				intradayDataBtnContainer.style.display = 'none'
				marketListsBtnContainer.style.display = 'block'
			}

			getCommodities.onclick = function() { eachButtonSetup(getCommodities) }
			getMajorCurrencies.onclick = function() { eachButtonSetup(getMajorCurrencies) }
			getCurrencyCrosses.onclick = function() { eachButtonSetup(getCurrencyCrosses, '', '', '', '', 'block') }
			getStockMarketIndexes.onclick = function() { eachButtonSetup(getStockMarketIndexes) }
			getGovernmentBonds.onclick = function() { eachButtonSetup(getGovernmentBonds) }
			getSpecificMarketsBySymbol.onclick = function() { eachButtonSetup(getSpecificMarketsBySymbol, '', '', '', '', '', 'block') }
			getSpecificHistoricalMarketsDataBySymbol.onclick = function() { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbol, '', '', '', '', '', 'block') }
			getSpecificHistoricalMarketsDataBySymbolStartingFromDate.onclick = function() { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbolStartingFromDate, '', '', '', '', '', 'block', 'block') }
			getSpecificHistoricalMarketsDataBySymbolFromDateToDate.onclick = function() { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbolFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
			getIntradayPricesByMarketSymbol.onclick = function() { eachButtonSetup(getIntradayPricesByMarketSymbol, '', '', '', '', '', 'block') }
			getIntradayPricesByMarketSymbolStartingFromDateAndHour.onclick = function() { eachButtonSetup(getIntradayPricesByMarketSymbolStartingFromDateAndHour, '', '', '', '', '', 'block', 'block', '', '', '', '', 'block'), dateFromOneInputLabel.textContent = 'Filter by Date' }
			getIntradayPricesByMarketSymbolFromDateToDate.onclick = function() { eachButtonSetup(getIntradayPricesByMarketSymbolFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
			getLatestPeersPricesByMarketSymbol.onclick = function() { eachButtonSetup(getLatestPeersPricesByMarketSymbol, '', '', '', '', '', 'block') }
			getStockMarketsIndexComponentsbySymbol.onclick = function() { eachButtonSetup(getStockMarketsIndexComponentsbySymbol, '', '', '', '', '', 'block') }
		}

		else if (methodValue == 'earnings') {
			earningsContainer.style.display = 'block'

			getEarningsByType.style.display = 'none'

			getDefaultEarningsCalendar.onclick = function() { eachButtonSetup(getDefaultEarningsCalendar) }
			getEarningsCalendarStartingFromDate.onclick = function() { eachButtonSetup(getEarningsCalendarStartingFromDate, '', '', '', '', '', '', 'block') }
			getEarningsCalendarByMarketStartingFromDate.onclick = function() { eachButtonSetup(getEarningsCalendarByMarketStartingFromDate, '', '', '', '', '', 'block', 'block') }
			getEarningsCalendarByMarketFromDateToDate.onclick = function() { eachButtonSetup(getEarningsCalendarByMarketFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
			getEarningsCalendarByCountry.onclick = function() { eachButtonSetup(getEarningsCalendarByCountry, '', 'block') }
			//getEarningsByType.onclick = function() { eachButtonSetup(getEarningsByType, '', '', '', '', '', '', '', '', 'block') }
		}

		else if (methodValue == 'news') {
			newsContainer.style.display = 'block'

			latestNewsBtnContainer.style.display = 'none'
			lastestArticlesBtnContainer.style.display = 'none'

			newsHr.style.display = 'none'

			latestNewsBtn.onclick = function() {
				buttonStyle(latestNewsBtn)
				newsHr.style.display = 'block'
				latestNewsBtnContainer.style.display = 'block'
				lastestArticlesBtnContainer.style.display = 'none'
			}

			lastestArticlesBtn.onclick = function() {
				buttonStyle(lastestArticlesBtn)
				newsHr.style.display = 'block'
				latestNewsBtnContainer.style.display = 'none'
				lastestArticlesBtnContainer.style.display = 'block'
			}

			getLatestNews.onclick = function() { eachButtonSetup(getLatestNews) }
			getNewsByCountry.onclick = function() { eachButtonSetup(getNewsByCountry, '', 'block') }
			getNewsByIndicator.onclick = function() { eachButtonSetup(getNewsByIndicator, 'block') }
			getNewsByCountryAndIndicator.onclick = function() { eachButtonSetup(getNewsByCountryAndIndicator, 'block', 'block') }
			getNewsListSpecifyingStartIndexAndListSize.onclick = function() { eachButtonSetup(getNewsListSpecifyingStartIndexAndListSize, '', '', '', '', '', '', '', '', '', 'block') }
			getLatestArticles.onclick = function() { eachButtonSetup(getLatestArticles) }
			getArticlesByCountry.onclick = function() { eachButtonSetup(getArticlesByCountry, '', 'block') }
			getArticlesByCountryFromDateToDate.onclick = function() { eachButtonSetup(getArticlesByCountryFromDateToDate, '', 'block', '', '', '', '', '', 'block') }
			getLatestArticlesByIndicator.onclick = function() { eachButtonSetup(getLatestArticlesByIndicator, 'block') }
			getLatestArticlesByCountryAndIndicator.onclick = function() { eachButtonSetup(getLatestArticlesByCountryAndIndicator, 'block', 'block') }
			getArticlesById.onclick = function() { eachButtonSetup(getArticlesById, '', '', '', '', '', '', '', '', '', '', 'block') }
			getArticlesListSpecifyingStartIndexAndListSize.onclick = function() { eachButtonSetup(getArticlesListSpecifyingStartIndexAndListSize, '', '', '', '', '', '', '', '', '', 'block') }
		}
	})
})
})()
