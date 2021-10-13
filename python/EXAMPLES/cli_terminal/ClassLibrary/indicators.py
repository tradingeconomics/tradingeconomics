import tradingeconomics as te
from .section import Section

class Indicators():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Indicators  ********'
        self.section_name = 'Indicators'
        
        self.dictionary={
                    '1':' - List of all indicators',
                    '2':' - List of indicators by country',
                    '3':' - List of indicators by country and group( you can check groups in the "categoryGroup" field of /indicators)',
                    '4':' - Specific indicator for all countries',
                    '5':' - Specific indicator or a list of indicators by ticker',
                    '6':' - Historical for specific country and indicator',
                    '7':' - Historical for specific country and indicator and start date',
                    '8':' - Historical for specific country and indicator and date range',
                    '9':' - Historical list of indicators for specific country',
                    '10':' - Historical specific indicator for a list of countries',
                    '11':' - Historical for a list of indicator and for a list of countries',
                    '12':' - Historical data by ticker',
                    '13':' - List of Discontinued Series for all countries.',
                    '14':' - List of Discontinued Series for a country or a list of countries',
                    '15':' - Forecast for a specific country',
                    '16':' - Forecast for a list of countries',
                    '17':' - Forecast for a specific indicator or for a list of indicators',
                    '18':' - Forecast for a specific ticker or for a list of tickers',
                    '19':' - Forecast for a specific country or list of countries and indicator or a list of indicators',
                    '20':' - Credit Rating: Latest',
                    '21':' - Credit Rating of the specific country or for a list of countries',
                    '22':' - Credit Rating: Historical for one country or for a list of countries',
                    '23':' - Credit Rating: Historical for one country by start and end date',
                    '24':' - Credit Rating: Historical for one country by start date',
                    '25': ' - Latest Updates: All',
                    '26': ' - Latest Updates by start date',
                    '27': ' - Latest Updates by country',
                    '28': ' - Latest Updates by country and start date',
                    '29': ' - Back to Main Menu'
                    
                    }
    
        def select_function(self):
            section = Section()
            te.login(self.key)
            list_of_number = self.dictionary.keys()
            number = ''
                
            number = section.first_section(section_title=self.title,
                                    section_dictionary=self.dictionary,
                                    list_of_number = list_of_number)
            
            all_dict_values = list(self.dictionary.values())
            back_to_main_menu_index = all_dict_values.index(' - Back to Main Menu')
                
            if number == str(back_to_main_menu_index + 1):
                return False

            selected_output_type = section.select_output_type()


            try:
                data_response = ''
                if number == '1':
                    data_response=te.getIndicatorData(output_type=selected_output_type)

                if number == '2':
                    selected_country = section.select('country', 'united states')
                    data_response=te.getIndicatorData(country=selected_country, output_type=selected_output_type)
                
                if number == '3':
                    selected_country = section.select('country', 'united states')
                    selected_category_group = section.select('category_group','gdp')
                    data_response=te.getIndicatorByCategoryGroup(country=selected_country, category_group=selected_category_group, output_type=selected_output_type)
                
                if number == '4':
                    selected_indicator = section.select('indicator','gdp')
                    data_response=te.getIndicatorData(country='all', indicators=selected_indicator, output_type=selected_output_type)
                
                if number == '5':
                    selected_ticker = section.select_ticker_list('usurtot,wgdpchin')
                    data_response=te.getIndicatorByTicker(ticker=selected_ticker, output_type=selected_output_type)
                
                if number == '6':
                    selected_country = section.select('country','united states')
                    selected_indicator = section.select('indicator','gdp')
                    data_response=te.getHistoricalData(country=selected_country, indicator=selected_indicator, output_type=selected_output_type)

                if number == '7':
                    selected_country = section.select('country','united states')
                    selected_indicator = section.select('indicator','gdp')
                    selected_init_date = section.selected_init_date()
                    data_response=te.getHistoricalData(country=selected_country, indicator=selected_indicator,initDate=selected_init_date, output_type=selected_output_type)
                    
                if number == '8':
                    selected_country = section.select('country','united states')
                    selected_indicator = section.select('indicator','gdp')
                    selected_dates = section.select_dates()
                    data_response=te.getHistoricalData(country=selected_country, indicator=selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                    
                if number == '9':
                    selected_country = section.select('country','united states')
                    selected_indicator =section.select_indicators_list('gdp,population')
                    data_response=te.getHistoricalData(country=selected_country, indicator=selected_indicator, output_type=selected_output_type)
                
                if number == '10':
                    selected_indicator =section.select('indicator','gdp')
                    selected_countries = section.select_countries()
                    data_response=te.getHistoricalData(country=selected_countries, indicator=selected_indicator, output_type=selected_output_type)
                
                if number == '11':
                    
                    selected_indicators =section.select_indicators_list('gdp,population')
                    selected_countries = section.select_countries()
                    data_response=te.getHistoricalData(country=selected_countries, indicator=selected_indicators, output_type=selected_output_type)
                
                if number == '12':
                    selected_ticker = section.select('ticker','usurtot')
                    selected_init_date = section.select_init_date()
                    data_response=te.getHistoricalByTicker(ticker=selected_ticker, start_date=selected_init_date, output_type=selected_output_type)
                
                if number == '13':
                    data_response=te.getDiscontinuedIndicator( output_type=selected_output_type)

                if number == '14':
                    selected_countries = section.select_countries()
                    data_response=te.getDiscontinuedIndicator(country=selected_countries, output_type=selected_output_type)

                if number == '15':
                    selected_country = section.select('country', 'united states')
                    data_response=te.getForecastData(country=selected_country, output_type=selected_output_type)
                    
                if number == '16':
                    selected_countries = section.select_countries()
                    data_response=te.getForecastData(country=selected_countries, output_type=selected_output_type)
                
                if number == '17':
                    selected_indicators =section.select_indicators_list('gdp','population')
                    data_response=te.getForecastData(indicator=selected_indicators, output_type=selected_output_type)
                
                if number == '18':
                    selected_tickers = section.select_ticker_list('usurtot','wgdpchin')
                    data_response=te.getForecastByTicker(ticker=selected_tickers, output_type=selected_output_type)
                
                if number == '19':
                    selected_countries = section.select_countries()
                    selected_indicators =section.select_indicators_list('gdp','population')
                    data_response=te.getForecastData(country = selected_countries, indicator = selected_indicators, output_type=selected_output_type)
                
                if number == '20':
                    data_response=te.getRatings(output_type=selected_output_type)
                
                if number == '21':
                    selected_countries = section.select_countries()
                    data_response=te.getRatings(country=selected_countries, output_type=selected_output_type)
                
                if number == '22':
                    selected_countries = section.select_countries()
                    data_response=te.getHistoricalRatings(country=selected_countries, output_type=selected_output_type)

                if number == '23':
                    selected_country = section.select('country', 'united states')
                    selected_dates = section.select_dates()
                    data_response=te.getHistoricalRatings(country = 'United States', initDate =selected_dates[0], endDate = selected_dates[1], output_type=selected_output_type)

                if number == '24':
                    selected_country = section.select('country', 'united states')
                    selected_init_date = section.select_init_date()
                    data_response=te.getHistoricalRatings(country = selected_country, initDate =selected_init_date, output_type=selected_output_type)

                if number == '25':
                    data_response=te.getLatestUpdates(output_type = 'df')

                if number == '26':
                    selected_init_date = section.select_init_date()
                    data_response=te.getLatestUpdates(initDate = selected_init_date, output_type = selected_output_type)

                if number == '27':
                    selected_country = section.select('country', 'portugal')
                    data_response=te.getLatestUpdates(country=selected_country, output_type=selected_output_type)
                
                if number == '28':
                    selected_ticker = section.select_ticker_list()
                    selected_init_date = section.select_init_date()
                    data_response=te.getLatestUpdates(country='portugal', init_date='2018-01-01', output_type=selected_output_type)
                
                if selected_output_type == 'df':
                    print(data_response.to_string())
                else:
                    print(data_response)

                return 'continue_or_back_to_main_menu'
            except Exception as e:
                print('**************************************************')
                print(e) 
                    
            
            return str(number)
        
        function_selected = True
        section = Section()
        while function_selected:
            function_selected=select_function(self)
            if function_selected == 'continue_or_back_to_main_menu':
                function_selected = section.new_request_or_back_to_menu(self.section_name)
    
   
                






         

        
        
        

    

    

    
    

    

        



    

    

