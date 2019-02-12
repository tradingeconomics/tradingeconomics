(function () {
	let myConnector = tableau.makeConnector()
    myConnector.getSchema = schemaCallback => {

		let urlObj = JSON.parse(tableau.connectionData)

		let dataCategory =  urlObj.urlBase.split('/')[1]
		if (urlObj.urlBase.includes('earnings')) { dataCategory = 'earnings' }
    	console.log(`Category: ${dataCategory}`)

		let dataSecondPoint = urlObj.urlBase.split('/')[2]
		console.log(`SecondPoint: ${dataSecondPoint}`)

		let dataThirdPoint = urlObj.urlBase.split('/')[3]
		console.log(`ThirdPoint: ${dataThirdPoint}`)
		
		//The columns to be shown are defined here
		if(dataCategory == 'indicators' && dataSecondPoint == undefined) {
    		let cols = [
		        {id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
				{id : 'CategoryGroup', alias : 'CategoryGroup', dataType : tableau.dataTypeEnum.string}
		    ]
		    var tableInfo = {
		        id : 'listOfAllIndicators',
		        alias : 'Trading Economics Indicators Data',
		        columns : cols
			}
		} else if (dataCategory == 'indicators' && dataSecondPoint != undefined || dataCategory == 'country') {
    		let cols = [
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
    		let cols = [
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
    		let cols = [
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
    		let cols = [
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
    		let cols = [
				{id : 'Country', alias : 'Countr', dataType : tableau.dataTypeEnum.string},
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
    		let cols = [
				{id : 'HistoricalDataSymbol', alias : 'HistoricalDataSymbol', dataType : tableau.dataTypeEnum.string},
				{id : 'LastUpdate', alias : 'LastUpdate', dataType : tableau.dataTypeEnum.date}
		    ]
		    var tableInfo = {
		        id : 'lastUpdatesFeed',
		        alias : 'Trading Economics Last Updates Data',
		        columns : cols
		    }
    	} else if (dataCategory == 'markets' && dataSecondPoint != 'historical' && dataSecondPoint != 'intraday') {
    		let cols = [
		        {id : 'Symbol', alias : 'Symbol', dataType : tableau.dataTypeEnum.string},
				{id : 'Ticker', alias : 'Ticker', dataType : tableau.dataTypeEnum.string},
				{id : 'Name', alias : 'Name', dataType : tableau.dataTypeEnum.string},
				{id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
				{id : 'Date', alias : 'Date', dataType : tableau.dataTypeEnum.datetime},
				{id : 'Last', alias : 'Last', dataType : tableau.dataTypeEnum.float},
				{id : 'Group', alias : 'Group', dataType : tableau.dataTypeEnum.string},
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
    		let cols = [
		        {id : 'Symbol', alias : 'Symbol', dataType : tableau.dataTypeEnum.string},
				{id : 'DateHour', alias : 'Date', dataType : tableau.dataTypeEnum.date},
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
    		let cols = [
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
		        alias : 'Trading Economics Earnings Dat',
		        columns : cols
			}
		} else if (dataCategory == 'news' || dataCategory == 'articles') {
    		let cols = [
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
    		let cols = [
		        { id : 'Country', alias : 'Country', dataType : tableau.dataTypeEnum.string},
				{ id : 'Category', alias : 'Category', dataType : tableau.dataTypeEnum.string},
				{ id : 'Title', alias : 'Title', dataType : tableau.dataTypeEnum.string},
				{ id : 'NextForecastValue', alias : 'NextForecastValue', dataType : tableau.dataTypeEnum.float},
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
				{ id : "Frequency", alias : "Frequency", dataType : tableau.dataTypeEnum.string},
				{ id : "HistoricalDataSymbol", alias : "HistoricalDataSymbol", dataType : tableau.dataTypeEnum.string}
		    ]
		    var tableInfo = {
		        id : 'forecastFeed',
		        alias : 'Trading Economics Forecast Data',
		        columns : cols
		    }
    	}
		schemaCallback([tableInfo])
	}
	
    myConnector.getData = (table, doneCallback) => {
		
		let urlObj = JSON.parse(tableau.connectionData)
		
		//Final Url is created here
		let apiCall = `https://api.tradingeconomics.com${urlObj.urlBase}?f=json&c=${urlObj.apiKey}&${urlObj.urlAfter}`
		if(urlObj.urlBase.includes('earnings?type=')) {
			apiCall = `https://api.tradingeconomics.com${urlObj.urlBase}&f=json&c=${urlObj.apiKey}`
		}

		console.log(`apiCall: ${apiCall}`)

		let dataCategory =  urlObj.urlBase.split('/')[1]

    	$.getJSON(apiCall, resp => {

			let tableData = []

			//Atributting value to the columns defined earlier
			for (let i = 0, len = resp.length; i < len; i++) {
			
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
				if(!resp[i].unit) { resp[i].unit = ''}

				if (dataCategory == 'news' || dataCategory == 'articles') {
					tableData.push({
					'Id' : resp[i].id,
					'Title' : resp[i].title,
					'Date' : resp[i].date.split('T')[0],
					'Description' : resp[i].description,
					'Country' : resp[i].country,
					'Category' : resp[i].category,
					'Symbol' : resp[i].symbol,
					'Url' : resp[i].url,
					})
					continue
				}

				tableData.push({
					'Ticker' : resp[i].Ticker,
					'Name'  : resp[i].Name ,
					'Symbol' : resp[i].Symbol,
					'CalendarId' : resp[i].CalendarId,
					'Title' : resp[i].Title,
					'CalendarReference' : resp[i].CalendarReference,
					'Country' : resp[i].Country,
					'Category' : resp[i].Category,
					'CategoryGroup' : resp[i].CategoryGroup,
					'Reference' : resp[i].Reference,
					'Event' : resp[i].Event,
					'Currency' : resp[i].Currency,
					'Source' : resp[i].Source,
					'Group'  : resp[i].Group,
					'URL' : resp[i].URL,
					'Decimals' : resp[i].decimals,
					'Adjustment' : resp[i].Adjustment,
					'Q1Date' : resp[i].q1_date.split('T')[0],
					'Q2Date' : resp[i].q2_date.split('T')[0],
					'Q3Date' : resp[i].q3_date.split('T')[0],
					'Q4Date' : resp[i].q4_date.split('T')[0],
					'PreviousValueDate' : resp[i].PreviousValueDate.split('T')[0],
					'Date' : resp[i].Date.split('T')[0],
					'DateTime' : resp[i].DateTime.split('T')[0],
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
					'NextForecastValue' : resp[i].NextForecastValue,
					'YearEnd' : resp[i].YearEnd,
					'YearTwoEnd' : resp[i].YearEnd2,
					'YearThreeEnd' : resp[i].YearEnd3,
					'Q1' : resp[i].q1,
					'Q2' : resp[i].q2,
					'Q3' : resp[i].q3,
					'Q4' : resp[i].q4,
					'Unit' : String(resp[i].unit),
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
	}
	
    tableau.registerConnector(myConnector)

    $(document).ready(() => {

		let inputsID = ['indicatorInput', 'countryInput', 'tickerInput', 'calendarIdInput', 'currencyISOInput', 'marketSymbolInput', 'dateFromOneInput', 'dateFromInput', 'dateToInput', 'earningsTypeInput', 'startIndexInput', 'listSizeInput', 'articleIdInput', 'hourInput']
		let inputsSelected = []

		//Selecting DOM Elements
		function selectFromDOM(idArray, selectedArray) {
			for (let i in idArray) {
				selectedArray[i] = document.getElementById(idArray[i])
			}
		}

		selectFromDOM(inputsID, inputsSelected)

		let urlToBakeCode = ''

		let submitButton = document.getElementById('submitButton')
		submitButton.onclick = () => { 
		
			let _baseUrl = ''
			let _urlAfter = ''

			//Creating the specific url's foreach case
			//Indicators
			if (urlToBakeCode == 'getEveryTeApiIndicatorName') { _baseUrl = `/indicators` }
			else if (urlToBakeCode == 'getEveryIndicatorOfaCountry') { _baseUrl = `/country/${inputsSelected[1].value}` } 
			else if (urlToBakeCode == 'getThatIndicatorForAllCountries') { _baseUrl = `/country/all/${inputsSelected[0].value}` } 
			else if (urlToBakeCode == 'getSpecificCountriesAndIndicators') { _baseUrl = `/historical/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getSpecificCountriesAndIndicatorsStartingFromaDate') { _baseUrl = `/historical/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}/${inputsSelected[6].value}` }
			else if (urlToBakeCode == 'getSpecificCountriesAndIndicatorsFromDateToDate') { _baseUrl = `/historical/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getDataByTicker') { _baseUrl = `/historical/ticker/${inputsSelected[2].value}/${inputsSelected[6].value}` }
			else if (urlToBakeCode == 'getCountryRating') { _baseUrl = `/ratings/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getCountryHistoricalRating') { _baseUrl = `/ratings/historical/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getAllUpdates') { _baseUrl = '/updates' }
			else if (urlToBakeCode == 'getUpdatesStartingFromADate') { _baseUrl = `/updates/${inputsSelected[6].value}` }
			//Calendar
			else if (urlToBakeCode == 'getAllCalendarEvents') { _baseUrl = `/calendar` }
			else if (urlToBakeCode == 'getCalendarEventsFromDateToDate') { _baseUrl = `/calendar/country/All/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificCountries') { _baseUrl = `/calendar/country/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesFromDateToDate') { _baseUrl = `/calendar/country/${inputsSelected[1].value}/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificIndicator') { _baseUrl = `/calendar/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificIndicatorFromDateToDate') { _baseUrl = `/calendar/indicator/${inputsSelected[0].value}/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesAndIndicators') { _baseUrl = `/calendar/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate') { _baseUrl = `/calendar/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getCalendarEventsByCalendarId') { _baseUrl = `/calendar/calendarid/${inputsSelected[3].value}` }
			//Forecast
			else if (urlToBakeCode == 'getForecastsForSpecificCountries') { _baseUrl = `/forecast/country/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getForecastsForSpecificIndicator') { _baseUrl = `/forecast/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getForecastsForSpecificCountriesAndIndicators') { _baseUrl = `/forecast/country/${inputsSelected[1].value}/indicator/${inputsSelected[0].value}` }
			//Markets
			else if (urlToBakeCode == 'getCommodities') { _baseUrl = `/markets/commodities` }
			else if (urlToBakeCode == 'getMajorCurrencies') { _baseUrl = `/markets/currency` }
			else if (urlToBakeCode == 'getCurrencyCrosses') {_baseUrl = `/markets/currency`, _urlAfter = `cross=${inputsSelected[4].value}` }
			else if (urlToBakeCode == 'getStockMarketIndexes') { _baseUrl = `/markets/index` }
			else if (urlToBakeCode == 'getGovernmentBonds') { _baseUrl = `/markets/bond` }
			else if (urlToBakeCode == 'getSpecificMarketsBySymbol') { _baseUrl = `/markets/symbol/${inputsSelected[5].value}` }
			else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbol') { _baseUrl = `/markets/historical/${inputsSelected[5].value}` }
			else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbolStartingFromDate') { _baseUrl = `/markets/historical/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[6].value}` }
			else if (urlToBakeCode == 'getSpecificHistoricalMarketsDataBySymbolFromDateToDate') { _baseUrl = `/markets/historical/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[7].value}&d2=${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getIntradayPricesByMarketSymbol') { _baseUrl = `/markets/intraday/${inputsSelected[5].value}` }
			else if (urlToBakeCode == 'getIntradayPricesByMarketSymbolStartingFromDateAndHour') { _baseUrl = `/markets/intraday/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[6].value} ${inputsSelected[13].value}` }
			else if (urlToBakeCode == 'getIntradayPricesByMarketSymbolFromDateToDate') { _baseUrl = `/markets/intraday/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[7].value}&d2=${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getLatestPeersPricesByMarketSymbol') { _baseUrl = `/markets/peers/${inputsSelected[5].value}` }
			else if (urlToBakeCode == 'getStockMarketsIndexComponentsbySymbol') { _baseUrl = `/markets/components/${inputsSelected[5].value}` }
			//Earnings
			else if (urlToBakeCode == 'getDefaultEarningsCalendar') { _baseUrl = `/earnings` }
			else if (urlToBakeCode == 'getEarningsCalendarStartingFromDate') { _baseUrl = `/earnings`, _urlAfter = `d1=${inputsSelected[6].value}` }
			else if (urlToBakeCode == 'getEarningsCalendarByMarketStartingFromDate') { _baseUrl = `/earnings/symbol/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[6].value}` }
			else if (urlToBakeCode == 'getEarningsCalendarByMarketFromDateToDate') { _baseUrl = `/earnings/symbol/${inputsSelected[5].value}`, _urlAfter = `d1=${inputsSelected[7].value}&d2=${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getEarningsCalendarByCountry') { _baseUrl = `/earnings/country/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getEarningsByType') { _baseUrl = `/earnings?type=${inputsSelected[9].value}` }
			//News
			else if (urlToBakeCode == 'getLatestNews') { _baseUrl = `/news` }
			else if (urlToBakeCode == 'getNewsByCountry') { _baseUrl = `/news/country/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getNewsByIndicator') { _baseUrl = `/news/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getNewsByCountryAndIndicator') { _baseUrl = `/news/country/${inputsSelected[1].value}/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getNewsListSpecifyingStartIndexAndListSize') { _baseUrl = `/news`, _urlAfter = `limit=${inputsSelected[11].value}&start=${inputsSelected[10].value}` }
			else if (urlToBakeCode == 'getLatestArticles') { _baseUrl = `/articles` }
			else if (urlToBakeCode == 'getArticlesByCountry') { _baseUrl = `/articles/country/${inputsSelected[1].value}` }
			else if (urlToBakeCode == 'getArticlesByCountryFromDateToDate') { _baseUrl = `/articles/country/${inputsSelected[1].value}/from/${inputsSelected[7].value}/${inputsSelected[8].value}` }
			else if (urlToBakeCode == 'getLatestArticlesByIndicator') { _baseUrl = `/articles/indicator/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getLatestArticlesByCountryAndIndicator') { _baseUrl = `/articles/country/${inputsSelected[1].value}/${inputsSelected[0].value}` }
			else if (urlToBakeCode == 'getArticlesById') { _baseUrl = `/articles/id/${inputsSelected[12].value}` }
			else if (urlToBakeCode == 'getArticlesListSpecifyingStartIndexAndListSize') { _baseUrl = `/articles`, _urlAfter = `lim=${inputsSelected[11].value}&start=${inputsSelected[10].value}` }

			//This object will further complete the url with the API Key 
			let urlObj = {
				urlBase: _baseUrl.trim(),
				apiKey: $('#apiKeyInput').val().trim(),
				urlAfter: _urlAfter.trim()
			}

			tableau.connectionData = JSON.stringify(urlObj)
			tableau.connectionName = "Trading Economics"
			tableau.submit()
		}

		//DOM Selections
		let indicatorsHr = document.getElementById('indicatorsHr')
		let marketsHr = document.getElementById('marketsHr')
		let newsHr = document.getElementById('newsHr')
		let gettingWhatHr = document.getElementById('gettingWhatHr')
		let gettingWhatTitle = document.getElementById('gettingWhatTitle')
		let dateFromOneInputLabel = document.getElementById('dateFromOneInputLabel')
		let apiKeyInput = document.getElementById('apiKeyInput')
		//Indicators
		let indicatorsContainer = document.getElementById('indicatorsContainer')
		let allIndicatorsBtn = document.getElementById('allIndicatorsBtn')
		let allIndicatorsBtnContainer = document.getElementById('allIndicatorsBtnContainer')
		let historicalDataBtn = document.getElementById('historicalDataBtn')
		let historicalDataBtnContainer = document.getElementById('historicalDataBtnContainer')
		let creditRatingBtn = document.getElementById('creditRatingBtn')
		let creditRatingBtnContainer = document.getElementById('creditRatingBtnContainer')
		let updatesBtn = document.getElementById('updatesBtn')
		let updatesBtnContainer = document.getElementById('updatesBtnContainer')
		let getEveryTeApiIndicatorName = document.getElementById('getEveryTeApiIndicatorName')
		let getEveryIndicatorOfaCountry = document.getElementById('getEveryIndicatorOfaCountry')
		let getThatIndicatorForAllCountries = document.getElementById('getThatIndicatorForAllCountries')
		let getSpecificCountriesAndIndicators = document.getElementById('getSpecificCountriesAndIndicators')
		let getSpecificCountriesAndIndicatorsStartingFromaDate = document.getElementById('getSpecificCountriesAndIndicatorsStartingFromaDate')
		let getSpecificCountriesAndIndicatorsFromDateToDate = document.getElementById('getSpecificCountriesAndIndicatorsFromDateToDate')
		let getDataByTicker = document.getElementById('getDataByTicker')
		let getCountryRating = document.getElementById('getCountryRating')
		let getCountryHistoricalRating = document.getElementById('getCountryHistoricalRating')
		let getAllUpdates = document.getElementById('getAllUpdates')
		let getUpdatesStartingFromADate = document.getElementById('getUpdatesStartingFromADate')
		//Calendar
		let calendarContainer = document.getElementById('calendarContainer')
		let getAllCalendarEvents = document.getElementById('getAllCalendarEvents')
		let getCalendarEventsFromDateToDate = document.getElementById('getCalendarEventsFromDateToDate')
		let getCalendarEventsForSpecificCountries = document.getElementById('getCalendarEventsForSpecificCountries')
		let getCalendarEventsForSpecificCountriesFromDateToDate = document.getElementById('getCalendarEventsForSpecificCountriesFromDateToDate')
		let getCalendarEventsForSpecificIndicator = document.getElementById('getCalendarEventsForSpecificIndicator')
		let getCalendarEventsForSpecificIndicatorFromDateToDate = document.getElementById('getCalendarEventsForSpecificIndicatorFromDateToDate')
		let getCalendarEventsForSpecificCountriesAndIndicators = document.getElementById('getCalendarEventsForSpecificCountriesAndIndicators')
		let getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate = document.getElementById('getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate')
		let getCalendarEventsByCalendarId = document.getElementById('getCalendarEventsByCalendarId')
		//Forecast
		let forecastContainer = document.getElementById('forecastContainer')
		let getForecastsForSpecificCountries = document.getElementById('getForecastsForSpecificCountries')
		let getForecastsForSpecificIndicator = document.getElementById('getForecastsForSpecificIndicator')
		let getForecastsForSpecificCountriesAndIndicators = document.getElementById('getForecastsForSpecificCountriesAndIndicators')
		//Markets
		let marketsContainer = document.getElementById('marketsContainer')
		let snapshotsBtn = document.getElementById('snapshotsBtn')
		let snapshotsBtnContainer = document.getElementById('snapshotsBtnContainer')
		let historicalDataMarketsBtn = document.getElementById('historicalDataMarketsBtn')
		let historicalDataMarketsBtnContainer = document.getElementById('historicalDataMarketsBtnContainer')
		let intradayDataBtn = document.getElementById('intradayDataBtn')
		let intradayDataBtnContainer = document.getElementById('intradayDataBtnContainer')
		let marketListsBtn = document.getElementById('marketListsBtn')
		let marketListsBtnContainer = document.getElementById('marketListsBtnContainer')
		let getCommodities = document.getElementById('getCommodities')
		let getMajorCurrencies = document.getElementById('getMajorCurrencies')
		let getCurrencyCrosses = document.getElementById('getCurrencyCrosses')
		let getStockMarketIndexes = document.getElementById('getStockMarketIndexes')
		let getGovernmentBonds = document.getElementById('getGovernmentBonds')
		let getSpecificHistoricalMarketsDataBySymbol = document.getElementById('getSpecificHistoricalMarketsDataBySymbol')
		let getSpecificHistoricalMarketsDataBySymbolStartingFromDate = document.getElementById('getSpecificHistoricalMarketsDataBySymbolStartingFromDate')
		let getSpecificHistoricalMarketsDataBySymbolFromDateToDate = document.getElementById('getSpecificHistoricalMarketsDataBySymbolFromDateToDate')
		let getIntradayPricesByMarketSymbol = document.getElementById('getIntradayPricesByMarketSymbol')
		let getIntradayPricesByMarketSymbolStartingFromDateAndHour = document.getElementById('getIntradayPricesByMarketSymbolStartingFromDateAndHour')
		let getIntradayPricesByMarketSymbolFromDateToDate = document.getElementById('getIntradayPricesByMarketSymbolFromDateToDate')
		let getLatestPeersPricesByMarketSymbol = document.getElementById('getLatestPeersPricesByMarketSymbol')
		let getStockMarketsIndexComponentsbySymbol = document.getElementById('getStockMarketsIndexComponentsbySymbol')
		//Earnings
		let earningsContainer = document.getElementById('earningsContainer')
		let getDefaultEarningsCalendar = document.getElementById('getDefaultEarningsCalendar')
		let getEarningsCalendarStartingFromDate = document.getElementById('getEarningsCalendarStartingFromDate')
		let getEarningsCalendarByMarketStartingFromDate = document.getElementById('getEarningsCalendarByMarketStartingFromDate')
		let getEarningsCalendarByMarketFromDateToDate = document.getElementById('getEarningsCalendarByMarketFromDateToDate')
		let getEarningsCalendarByCountry = document.getElementById('getEarningsCalendarByCountry')
		let getEarningsByType = document.getElementById('getEarningsByType')
		//News
		let newsContainer = document.getElementById('newsContainer')
		let latestNewsBtn = document.getElementById('latestNewsBtn')
		let latestNewsBtnContainer = document.getElementById('latestNewsBtnContainer')
		let lastestArticlesBtn = document.getElementById('lastestArticlesBtn')
		let lastestArticlesBtnContainer = document.getElementById('lastestArticlesBtnContainer')
		let getLatestNews = document.getElementById('getLatestNews')
		let getNewsByCountry = document.getElementById('getNewsByCountry')
		let getNewsByIndicator = document.getElementById('getNewsByIndicator')
		let getNewsByCountryAndIndicator = document.getElementById('getNewsByCountryAndIndicator')
		let getNewsListSpecifyingStartIndexAndListSize = document.getElementById('getNewsListSpecifyingStartIndexAndListSize')
		let getLatestArticles = document.getElementById('getLatestArticles')
		let getArticlesByCountry = document.getElementById('getArticlesByCountry')
		let getArticlesByCountryFromDateToDate = document.getElementById('getArticlesByCountryFromDateToDate')
		let getLatestArticlesByIndicator = document.getElementById('getLatestArticlesByIndicator')
		let getLatestArticlesByCountryAndIndicator = document.getElementById('getLatestArticlesByCountryAndIndicator')
		let getArticlesById = document.getElementById('getArticlesById')
		let getArticlesListSpecifyingStartIndexAndListSize = document.getElementById('getArticlesListSpecifyingStartIndexAndListSize')
		//Input/Form Containers
		let indicatorInputContainer = document.getElementById('indicatorInputContainer')
		let countryInputContainer = document.getElementById('countryInputContainer')
		let tickerInputContainer = document.getElementById('tickerInputContainer')
		let calendarIdInputContainer = document.getElementById('calendarIdInputContainer')
		let currencyISOInputContainer = document.getElementById('currencyISOInputContainer')
		let marketSymbolInputContainer = document.getElementById('marketSymbolInputContainer')
		let dateFromOneInputContainer = document.getElementById('dateFromOneInputContainer')
		let dateFromToInputContainer = document.getElementById('dateFromToInputContainer')
		let earningsTypeInputContainer = document.getElementById('earningsTypeInputContainer')
		let startIndexListSizeInputContainer = document.getElementById('startIndexListSizeInputContainer')
		let articleIdInputContainer = document.getElementById('articleIdInputContainer')
		let hourInputContainer = document.getElementById('hourInputContainer')
		let apiKeyInputContainer = document.getElementById('apiKeyInputContainer')

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

			let dropDownButton = document.getElementById('method')
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

				allIndicatorsBtn.onclick = () => {
					buttonStyle(allIndicatorsBtn)
					indicatorsHr.style.display = 'block'
					allIndicatorsBtnContainer.style.display = 'block'
					historicalDataBtnContainer.style.display = 'none'
					creditRatingBtnContainer.style.display = 'none'
					updatesBtnContainer.style.display = 'none'
				}

				historicalDataBtn.onclick = () => {
					buttonStyle(historicalDataBtn)
					indicatorsHr.style.display = 'block'
					allIndicatorsBtnContainer.style.display = 'none'
					historicalDataBtnContainer.style.display = 'block'
					creditRatingBtnContainer.style.display = 'none'
					updatesBtnContainer.style.display = 'none'
				}

				creditRatingBtn.onclick = () => {
					buttonStyle(creditRatingBtn)
					indicatorsHr.style.display = 'block'
					allIndicatorsBtnContainer.style.display = 'none'
					historicalDataBtnContainer.style.display = 'none'
					creditRatingBtnContainer.style.display = 'block'
					updatesBtnContainer.style.display = 'none'
				}

				updatesBtn.onclick = () => {
					buttonStyle(updatesBtn)
					indicatorsHr.style.display = 'block'
					allIndicatorsBtnContainer.style.display = 'none'
					historicalDataBtnContainer.style.display = 'none'
					creditRatingBtnContainer.style.display = 'none'
					updatesBtnContainer.style.display = 'block'
				}

				getEveryTeApiIndicatorName.onclick = () => { eachButtonSetup(getEveryTeApiIndicatorName) }
				getEveryIndicatorOfaCountry.onclick = () => { eachButtonSetup(getEveryIndicatorOfaCountry, '', 'block') }
				getThatIndicatorForAllCountries.onclick = () => { eachButtonSetup(getThatIndicatorForAllCountries, 'block') }
				getSpecificCountriesAndIndicators.onclick = () => { eachButtonSetup(getSpecificCountriesAndIndicators, 'block', 'block') }
				getSpecificCountriesAndIndicatorsStartingFromaDate.onclick = () => { eachButtonSetup(getSpecificCountriesAndIndicatorsStartingFromaDate, 'block', 'block', '', '', '', '', 'block') }
				getSpecificCountriesAndIndicatorsFromDateToDate.onclick = () => { eachButtonSetup(getSpecificCountriesAndIndicatorsFromDateToDate, 'block', 'block', '', '', '', '', '', 'block') }
				getDataByTicker.onclick = () => { eachButtonSetup(getDataByTicker, '', '', 'block', '', '', '', 'block') }
				getCountryRating.onclick = () => { eachButtonSetup(getCountryRating, '', 'block') }
				getCountryHistoricalRating.onclick = () => { eachButtonSetup(getCountryHistoricalRating, '', 'block') }
				getAllUpdates.onclick = () => { eachButtonSetup(getAllUpdates) }
				getUpdatesStartingFromADate.onclick = () => { eachButtonSetup(getUpdatesStartingFromADate, '', '', '', '', '', '', 'block') }
			}

			else if (methodValue == 'calendar') {
				calendarContainer.style.display = "block"

				getAllCalendarEvents.onclick = () => { eachButtonSetup(getAllCalendarEvents) }
				getCalendarEventsFromDateToDate.onclick = () => { eachButtonSetup(getCalendarEventsFromDateToDate, '', '', '', '', '', '', '', 'block') }
				getCalendarEventsForSpecificCountries.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificCountries, '', 'block') }
				getCalendarEventsForSpecificCountriesFromDateToDate.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificCountriesFromDateToDate, '', 'block', '', '', '', '', '', 'block') }
				getCalendarEventsForSpecificIndicator.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificIndicator, 'block') }
				getCalendarEventsForSpecificIndicatorFromDateToDate.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificIndicatorFromDateToDate, 'block', '', '', '', '', '', '', 'block') }
				getCalendarEventsForSpecificCountriesAndIndicators.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificCountriesAndIndicators, 'block', 'block') }
				getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate.onclick = () => { eachButtonSetup(getCalendarEventsForSpecificCountriesAndIndicatorsFromDateToDate, 'block', 'block', '', '', '', '', '', 'block') }
				getCalendarEventsByCalendarId.onclick = () => { eachButtonSetup(getCalendarEventsByCalendarId, '', '', '', 'block') }
			}

			else if (methodValue == 'forecast') {
				forecastContainer.style.display = "block"

				getForecastsForSpecificCountries.onclick = () => { eachButtonSetup(getForecastsForSpecificCountries, '', 'block') }
				getForecastsForSpecificIndicator.onclick = () => { eachButtonSetup(getForecastsForSpecificIndicator, 'block') }
				getForecastsForSpecificCountriesAndIndicators.onclick = () => { eachButtonSetup(getForecastsForSpecificCountriesAndIndicators, 'block', 'block') }
			}

			else if (methodValue == 'markets') {
				marketsContainer.style.display = 'block'

				snapshotsBtnContainer.style.display = 'none'
				historicalDataMarketsBtnContainer.style.display = 'none'
				intradayDataBtnContainer.style.display = 'none'
				marketListsBtnContainer.style.display = 'none'

				marketsHr.style.display = 'none'

				snapshotsBtn.onclick = () => {
					buttonStyle(snapshotsBtn)
					marketsHr.style.display = 'block'
					snapshotsBtnContainer.style.display = 'block'
					historicalDataMarketsBtnContainer.style.display = 'none'
					intradayDataBtnContainer.style.display = 'none'
					marketListsBtnContainer.style.display = 'none'
				}

				historicalDataMarketsBtn.onclick = () => {
					buttonStyle(historicalDataMarketsBtn)
					marketsHr.style.display = 'block'
					snapshotsBtnContainer.style.display = 'none'
					historicalDataMarketsBtnContainer.style.display = 'block'
					intradayDataBtnContainer.style.display = 'none'
					marketListsBtnContainer.style.display = 'none'
				}

				intradayDataBtn.onclick = () => {
					buttonStyle(intradayDataBtn)
					marketsHr.style.display = 'block'
					snapshotsBtnContainer.style.display = 'none'
					historicalDataMarketsBtnContainer.style.display = 'none'
					intradayDataBtnContainer.style.display = 'block'
					marketListsBtnContainer.style.display = 'none'
				}

				marketListsBtn.onclick = () => {
					buttonStyle(marketListsBtn)
					marketsHr.style.display = 'block'
					snapshotsBtnContainer.style.display = 'none'
					historicalDataMarketsBtnContainer.style.display = 'none'
					intradayDataBtnContainer.style.display = 'none'
					marketListsBtnContainer.style.display = 'block'
				}

				getCommodities.onclick = () => { eachButtonSetup(getCommodities) }
				getMajorCurrencies.onclick = () => { eachButtonSetup(getMajorCurrencies) }
				getCurrencyCrosses.onclick = () => { eachButtonSetup(getCurrencyCrosses, '', '', '', '', 'block') }
				getStockMarketIndexes.onclick = () => { eachButtonSetup(getStockMarketIndexes) }
				getGovernmentBonds.onclick = () => { eachButtonSetup(getGovernmentBonds) }
				getSpecificMarketsBySymbol.onclick = () => { eachButtonSetup(getSpecificMarketsBySymbol, '', '', '', '', '', 'block') }
				getSpecificHistoricalMarketsDataBySymbol.onclick = () => { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbol, '', '', '', '', '', 'block') }
				getSpecificHistoricalMarketsDataBySymbolStartingFromDate.onclick = () => { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbolStartingFromDate, '', '', '', '', '', 'block', 'block') }
				getSpecificHistoricalMarketsDataBySymbolFromDateToDate.onclick = () => { eachButtonSetup(getSpecificHistoricalMarketsDataBySymbolFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
				getIntradayPricesByMarketSymbol.onclick = () => { eachButtonSetup(getIntradayPricesByMarketSymbol, '', '', '', '', '', 'block') }
				getIntradayPricesByMarketSymbolStartingFromDateAndHour.onclick = () => { eachButtonSetup(getIntradayPricesByMarketSymbolStartingFromDateAndHour, '', '', '', '', '', 'block', 'block', '', '', '', '', 'block'), dateFromOneInputLabel.textContent = 'Filter by Date' }
				getIntradayPricesByMarketSymbolFromDateToDate.onclick = () => { eachButtonSetup(getIntradayPricesByMarketSymbolFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
				getLatestPeersPricesByMarketSymbol.onclick = () => { eachButtonSetup(getLatestPeersPricesByMarketSymbol, '', '', '', '', '', 'block') }
				getStockMarketsIndexComponentsbySymbol.onclick = () => { eachButtonSetup(getStockMarketsIndexComponentsbySymbol, '', '', '', '', '', 'block') }
			}

			else if (methodValue == 'earnings') {
				earningsContainer.style.display = ''

				getDefaultEarningsCalendar.onclick = () => { eachButtonSetup(getDefaultEarningsCalendar) }
				getEarningsCalendarStartingFromDate.onclick = () => { eachButtonSetup(getEarningsCalendarStartingFromDate, '', '', '', '', '', '', 'block') }
				getEarningsCalendarByMarketStartingFromDate.onclick = () => { eachButtonSetup(getEarningsCalendarByMarketStartingFromDate, '', '', '', '', '', 'block', 'block') }
				getEarningsCalendarByMarketFromDateToDate.onclick = () => { eachButtonSetup(getEarningsCalendarByMarketFromDateToDate, '', '', '', '', '', 'block', '', 'block') }
				getEarningsCalendarByCountry.onclick = () => { eachButtonSetup(getEarningsCalendarByCountry, '', 'block') }
				getEarningsByType.onclick = () => { eachButtonSetup(getEarningsByType, '', '', '', '', '', '', '', '', 'block') }
			}

			else if (methodValue == 'news') {
				newsContainer.style.display = 'block'

				latestNewsBtnContainer.style.display = 'none'
				lastestArticlesBtnContainer.style.display = 'none'

				newsHr.style.display = 'none'

				latestNewsBtn.onclick = () => {
					buttonStyle(latestNewsBtn)
					newsHr.style.display = 'block'
					latestNewsBtnContainer.style.display = 'block'
					lastestArticlesBtnContainer.style.display = 'none'
				}

				lastestArticlesBtn.onclick = () => {
					buttonStyle(lastestArticlesBtn)
					newsHr.style.display = 'block'
					latestNewsBtnContainer.style.display = 'none'
					lastestArticlesBtnContainer.style.display = 'block'
				}

				getLatestNews.onclick = () => { eachButtonSetup(getLatestNews) }
				getNewsByCountry.onclick = () => { eachButtonSetup(getNewsByCountry, '', 'block') }
				getNewsByIndicator.onclick = () => { eachButtonSetup(getNewsByIndicator, 'block') }
				getNewsByCountryAndIndicator.onclick = () => { eachButtonSetup(getNewsByCountryAndIndicator, 'block', 'block') }
				getNewsListSpecifyingStartIndexAndListSize.onclick = () => { eachButtonSetup(getNewsListSpecifyingStartIndexAndListSize, '', '', '', '', '', '', '', '', '', 'block') }
				getLatestArticles.onclick = () => { eachButtonSetup(getLatestArticles) }
				getArticlesByCountry.onclick = () => { eachButtonSetup(getArticlesByCountry, '', 'block') }
				getArticlesByCountryFromDateToDate.onclick = () => { eachButtonSetup(getArticlesByCountryFromDateToDate, '', 'block', '', '', '', '', '', 'block') }
				getLatestArticlesByIndicator.onclick = () => { eachButtonSetup(getLatestArticlesByIndicator, 'block') }
				getLatestArticlesByCountryAndIndicator.onclick = () => { eachButtonSetup(getLatestArticlesByCountryAndIndicator, 'block', 'block') }
				getArticlesById.onclick = () => { eachButtonSetup(getArticlesById, '', '', '', '', '', '', '', '', '', '', 'block') }
				getArticlesListSpecifyingStartIndexAndListSize.onclick = () => { eachButtonSetup(getArticlesListSpecifyingStartIndexAndListSize, '', '', '', '', '', '', '', '', '', 'block') }
			}
		})
	})
})()