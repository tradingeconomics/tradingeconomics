(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    	var urlObj = JSON.parse(tableau.connectionData),
				apiCall = "https://api.tradingeconomics.com" + urlObj.urlBase + "?f=json&c=" + urlObj.apiKey;

		var dataCategory =  urlObj.urlBase.split('/')[1];
    	console.log("my category = " + dataCategory)

    	if(dataCategory == "historical"){
    		var cols = [
		        { id : "Country", alias : "Country", dataType : tableau.dataTypeEnum.string },
		        { id : "Category", alias : "Category", dataType : tableau.dataTypeEnum.string },
		        { id : "DateTime", alias : "DateTime", dataType : tableau.dataTypeEnum.date },
		        { id : "Value", alias : "Value", dataType : tableau.dataTypeEnum.float },
		        { id : "Frequency", alias : "Frequency", dataType : tableau.dataTypeEnum.string },
		        { id : "HistoricalDataSymbol", alias : "HistoricalDataSymbol", dataType : tableau.dataTypeEnum.string},
		        { id : "LastUpdate", alias : "LastUpdate", dataType : tableau.dataTypeEnum.datetime}
		    ];

		    var tableInfo = {
		        id : "historicalFeed",
		        alias : "Trading Economics Historical Data",
		        columns : cols
		    };

    	} else if (dataCategory == "calendar") {
    		var cols = [
    			{ id : "Date", alias : "Date", dataType : tableau.dataTypeEnum.datetime },
		        { id : "Country", alias : "Country", dataType : tableau.dataTypeEnum.string },
		        { id : "Category", alias : "Category", dataType : tableau.dataTypeEnum.string },
		        { id : "Event", alias : "Event", dataType : tableau.dataTypeEnum.string },
		        { id : "Reference", alias : "Reference", dataType : tableau.dataTypeEnum.string },
		        { id : "Source", alias : "Source", dataType : tableau.dataTypeEnum.string },
		        { id : "Actual", alias : "Actual", dataType : tableau.dataTypeEnum.string},
		        { id : "Previous", alias : "Previous", dataType : tableau.dataTypeEnum.string},
		        { id : "Forecast", alias : "Forecast", dataType : tableau.dataTypeEnum.string},
		        { id : "TEForecast", alias : "TEForecast", dataType : tableau.dataTypeEnum.string },
		        { id : "URL", alias : "URL", dataType : tableau.dataTypeEnum.string },
		        { id : "Importance", alias : "Importance", dataType : tableau.dataTypeEnum.int},
		        { id : "LastUpdate", alias : "LastUpdate", dataType : tableau.dataTypeEnum.datetime}
		    ];

		    var tableInfo = {
		        id : "calendarFeed",
		        alias : "Trading Economics Calendar Data",
		        columns : cols
		    };

    	} else if (dataCategory == "indicators" | dataCategory == "country") {
    		var cols = [
		        { id : "Country", alias : "Country", dataType : tableau.dataTypeEnum.string },
		        { id : "Category", alias : "Category", dataType : tableau.dataTypeEnum.string },
		        { id : "Title", alias : "Title", dataType : tableau.dataTypeEnum.string },
		        { id : "LatestValueDate", alias : "LatestValueDate", dataType : tableau.dataTypeEnum.date },
		        { id : "LatestValue", alias : "LatestValue", dataType : tableau.dataTypeEnum.float },
		        { id : "Source", alias : "Source", dataType : tableau.dataTypeEnum.string},
		        { id : "Unit", alias : "Unit", dataType : tableau.dataTypeEnum.string},
		        { id : "URL", alias : "URL", dataType : tableau.dataTypeEnum.string},
		        { id : "CategoryGroup", alias : "CategoryGroup", dataType : tableau.dataTypeEnum.string },
		        { id : "Frequency", alias : "Frequency", dataType : tableau.dataTypeEnum.string },
		        { id : "HistoricalDataSymbol", alias : "HistoricalDataSymbol", dataType : tableau.dataTypeEnum.string},
		        { id : "PreviousValue", alias : "PreviousValue", dataType : tableau.dataTypeEnum.float},
		        { id : "PreviousValueDate", alias : "PreviousValueDate", dataType : tableau.dataTypeEnum.date}
		    ];

		    var tableInfo = {
		        id : "indicatorsFeed",
		        alias : "Trading Economics Indicators Data",
		        columns : cols
		    };

    	} else if (dataCategory == "markets") {
    		var cols = [
		        {id : "Symbol", alias : "Symbol", dataType : tableau.dataTypeEnum.string},
				{id : "Ticker", alias : "Ticker", dataType : tableau.dataTypeEnum.string},
				{id : "Name", alias : "Name", dataType : tableau.dataTypeEnum.string},
				{id : "Country", alias : "Country", dataType : tableau.dataTypeEnum.string},
				{id : "Date", alias : "Date", dataType : tableau.dataTypeEnum.datetime},
				{id : "Last", alias : "Last", dataType : tableau.dataTypeEnum.float},
				{id : "Group", alias : "Group", dataType : tableau.dataTypeEnum.string},
				{id : "URL", alias : "URL", dataType : tableau.dataTypeEnum.string},
				{id : "Importance", alias : "Importance", dataType : tableau.dataTypeEnum.float},
				{id : "DailyChange", alias : "DailyChange", dataType : tableau.dataTypeEnum.float},
				{id : "DailyPercentualChange", alias : "DailyPercentualChange", dataType : tableau.dataTypeEnum.float},
				{id : "WeeklyChange", alias : "WeeklyChange", dataType : tableau.dataTypeEnum.float},
				{id : "WeeklyPercentualChange", alias : "WeeklyPercentualChange", dataType : tableau.dataTypeEnum.float},
				{id : "MonthlyChange", alias : "MonthlyChange", dataType : tableau.dataTypeEnum.float},
				{id : "MonthlyPercentualChange", alias : "MonthlyPercentualChange", dataType : tableau.dataTypeEnum.float},
				{id : "YearlyChange", alias : "YearlyChange", dataType : tableau.dataTypeEnum.float},
				{id : "YearlyPercentualChange", alias : "YearlyPercentualChange", dataType : tableau.dataTypeEnum.float},
				{id : "YTDChange", alias : "YTDChange", dataType : tableau.dataTypeEnum.float},
				{id : "YTDPercentualChange", alias : "YTDPercentualChange", dataType : tableau.dataTypeEnum.float},
				{id : "yesterday", alias : "yesterday", dataType : tableau.dataTypeEnum.float},
				{id : "lastWeek", alias : "lastWeek", dataType : tableau.dataTypeEnum.float},
				{id : "lastMonth", alias : "lastMonth", dataType : tableau.dataTypeEnum.float},
				{id : "lastYear", alias : "lastYear", dataType : tableau.dataTypeEnum.float},
				{id : "startYear", alias : "startYear", dataType : tableau.dataTypeEnum.float},
				{id : "decimals", alias : "decimals", dataType : tableau.dataTypeEnum.string},
				{id : "unit", alias : "unit", dataType : tableau.dataTypeEnum.string}
		    ];

		    var tableInfo = {
		        id : "marketsFeed",
		        alias : "Trading Economics Markets Data",
		        columns : cols
		    };

    	} else if (dataCategory == "forecast") {
    		var cols = [
		        { id : "Country", alias : "Country", dataType : tableau.dataTypeEnum.string},
				{ id : "Category", alias : "Category", dataType : tableau.dataTypeEnum.string},
				{ id : "Title", alias : "Title", dataType : tableau.dataTypeEnum.string},
				//{ id : "NextForecastDate", alias : "NextForecastDate", dataType : tableau.dataTypeEnum.string},
				{ id : "NextForecastValue", alias : "NextForecastValue", dataType : tableau.dataTypeEnum.float},
				{ id : "YearEnd", alias : "YearEnd", dataType : tableau.dataTypeEnum.float},
				{ id : "YearEnd2", alias : "YearEnd2", dataType : tableau.dataTypeEnum.float},
				{ id : "YearEnd3", alias : "YearEnd3", dataType : tableau.dataTypeEnum.float},
				{ id : "q1", alias : "q1", dataType : tableau.dataTypeEnum.float},
				{ id : "q2", alias : "q2", dataType : tableau.dataTypeEnum.float},
				{ id : "q3", alias : "q3", dataType : tableau.dataTypeEnum.float},
				{ id : "q4", alias : "q4", dataType : tableau.dataTypeEnum.float},
				{ id : "LatestValue", alias : "LatestValue", dataType : tableau.dataTypeEnum.float},
				{ id : "LatestValueDate", alias : "LatestValueDate", dataType : tableau.dataTypeEnum.date},
				{ id : "q1_date", alias : "q1_date", dataType : tableau.dataTypeEnum.date},
				{ id : "q2_date", alias : "q2_date", dataType : tableau.dataTypeEnum.date},
				{ id : "q3_date", alias : "q3_date", dataType : tableau.dataTypeEnum.date},
				{ id : "q4_date", alias : "q4_date", dataType : tableau.dataTypeEnum.date},
				{ id : "Frequency", alias : "Frequency", dataType : tableau.dataTypeEnum.string},
				{ id : "HistoricalDataSymbol", alias : "HistoricalDataSymbol", dataType : tableau.dataTypeEnum.string}
		    ];

		    var tableInfo = {
		        id : "forecastFeed",
		        alias : "Trading Economics Forecast Data",
		        columns : cols
		    };
    	}    	

	    schemaCallback([tableInfo]);
    };

    myConnector.getData = function (table, doneCallback) {
    	var urlObj = JSON.parse(tableau.connectionData),
				apiCall = "https://api.tradingeconomics.com" + urlObj.urlBase + "?f=json&c=" + urlObj.apiKey;
//
		var dataCategory =  urlObj.urlBase.split('/')[1];
    	//console.log("my category = " + dataCategory)

    	$.getJSON(apiCall, function(resp) {
	        tableData = [];

	        // Iterate over the JSON object
                if(dataCategory == "historical"){
                	for (var i = 0, len = resp.length; i < len; i++) {
			    		tableData.push({
					        "Country" : resp[i].Country,
					        "Category" : resp[i].Category,
					        "DateTime" : new Date(resp[i].DateTime.split('T')[0]),
					        "Value" : resp[i].Value,
					        "Frequency" : resp[i].Frequency,
					        "HistoricalDataSymbol" : resp[i].HistoricalDataSymbol,
					        "LastUpdate" : new Date(resp[i].LastUpdate)   
					    });
			    	}
		    	} else if (dataCategory == "calendar") {
		    		for (var i = 0, len = resp.length; i < len; i++){
			    		tableData.push({
			    			"Date" : new Date(resp[i].Date),
					        "Country" : resp[i].Country,
					        "Category" : resp[i].Category,
					        "Event" : resp[i].Event,
					        "Reference" : resp[i].Reference,
					        "Source" : resp[i].Source,
					        "Actual" : resp[i].Actual,
					        "Previous" : resp[i].Previous,
					        "Forecast" : resp[i].Forecast,
					        "TEForecast" : resp[i].TEForecast,
					        "URL" : resp[i].URL,
					        "Importance" : resp[i].Importance,
					        "LastUpdate" : new Date(resp[i].LastUpdate)
					    });
			    	}

		    	} else if (dataCategory == "indicators") {	
		    		for (var i = 0, len = resp.length; i < len; i++){	    		
			    		tableData.push({
					        "Category" : resp[i].Category,
					        "CategoryGroup" : resp[i].CategoryGroup
					    });
			    	}

			    } else if (dataCategory == "country") {
		    		for (var i = 0, len = resp.length; i < len; i++){
		    			if(!resp[i].LatestValueDate){
		    				continue;
		    			}
			    		tableData.push({
					        "Country" : resp[i].Country,
					        "Category" : resp[i].Category,
					        "Title" : resp[i].Title,
					        "LatestValueDate" : new Date(resp[i].LatestValueDate.split('T')[0]),
					        "LatestValue" : resp[i].LatestValue,
					        "Source" : resp[i].Source,
					        "Unit" : resp[i].Unit,
					        "URL" : resp[i].URL,
					        "CategoryGroup" : resp[i].CategoryGroup,
					        "Frequency" : resp[i].Frequency,
					        "HistoricalDataSymbol" : resp[i].HistoricalDataSymbol,
					        "PreviousValue" : resp[i].PreviousValue,
					        "PreviousValueDate" : new Date(resp[i].PreviousValueDate.split('T')[0])
					    });
			    	}	

		    	} else if (dataCategory == "markets") {
		    		for (var i = 0, len = resp.length; i < len; i++){
			    		tableData.push({
					        "Symbol" : resp[i].Symbol,
							"Ticker" : resp[i].Ticker,
							"Name"  : resp[i].Name ,
							"Country" : resp[i].Country,
							"Date" : new Date(resp[i].Date),
							"Last" : resp[i].Last,
							"Group"  : resp[i].Group,
							"URL" : resp[i].URL,
							"Importance" : resp[i].Importance,
							"DailyChange" : resp[i].DailyChange,
							"DailyPercentualChange" : resp[i].DailyPercentualChange,
							"WeeklyChange" : resp[i].WeeklyChange,
							"WeeklyPercentualChange" : resp[i].WeeklyPercentualChange,
							"MonthlyChange" : resp[i].MonthlyChange,
							"MonthlyPercentualChange" : resp[i].MonthlyPercentualChange,
							"YearlyChange" : resp[i].YearlyChange,
							"YearlyPercentualChange" : resp[i].YearlyPercentualChange,
							"YTDChange" : resp[i].YTDChange,
							"YTDPercentualChange" : resp[i].YTDPercentualChange,
							"yesterday" : resp[i].yesterday,
							"lastWeek" : resp[i].lastWeek,
							"lastMonth" : resp[i].lastMonth,
							"lastYear" : resp[i].lastYear,
							"startYear" : resp[i].startYear,
							"decimals" : resp[i].decimals,
							"unit" : String(resp[i].unit) 
					    });
					}
		    	} else if (dataCategory == "forecast") {
		    		for (var i = 0, len = resp.length; i < len; i++){
		    			if(!resp[i].LatestValueDate){
		    				continue;
		    			}
			    		tableData.push({
					        "Country" : resp[i].Country,
							"Category" : resp[i].Category,
							"Title" : resp[i].Title,
							//"NextForecastDate" : resp[i].NextForecastDate,
							"NextForecastValue" : resp[i].NextForecastValue,
							"YearEnd" : resp[i].YearEnd,
							"YearEnd2" : resp[i].YearEnd2,
							"YearEnd3" : resp[i].YearEnd3,
							"q1" : resp[i].q1,
							"q2" : resp[i].q2,
							"q3" : resp[i].q3,
							"q4" : resp[i].q4,
							"LatestValue" : resp[i].LatestValue,
							"LatestValueDate" : new Date(resp[i].LatestValueDate.split('T')[0]),
							"q1_date" : new Date(resp[i].q1_date.split('T')[0]),
							"q2_date" : new Date(resp[i].q2_date.split('T')[0]),
							"q3_date" : new Date(resp[i].q3_date.split('T')[0]),
							"q4_date" : new Date(resp[i].q4_date.split('T')[0]),
							"Frequency" : resp[i].Frequency,
							"HistoricalDataSymbol" : resp[i].HistoricalDataSymbol
					    });
					}    
		    	}	   

	        table.appendRows(tableData);
	        doneCallback();
	    });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
	    $("#submitButton").click(function() {
	        var urlObj = {
	            urlBase: $('#myUrl').val().trim(),
	            apiKey: $('#myKey').val().trim(),
	        };
            tableau.connectionData = JSON.stringify(urlObj);
            tableau.connectionName = "Trading Economics";
            tableau.submit();
	    });
	    var methods = {
	    	"historical": "/historical/country/country_name/indicator/indicator_name",
	    	"calendar": "/calendar/country/country_name/indicator/indicator_name",
	    	"indicators": "/country/country_name,country2,country3/indicator_name,indicator2,indicator3",
	    	"markets": "/markets/commodities",
	    	"forecast": "/forecast/country/country_name,country2,country3/indicator/indicator_name,indicator2,indicator3"
	    }
	    $( "#method" ).change(function() {
  			 var $method = $( "#method" ).val();
  			 $("#myUrl").val(methods[$method]);
		});
	});   
})();