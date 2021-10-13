import tradingeconomics as te
from .section import Section

class Markets():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Markets  ********'
        self.section_name = 'Markets'
        
        self.dictionary={
                    '1':' - List of all Commodities',
                    '2':' - List of Major Currencies',
                    '3':' - List of Currency Crosses',
                    '4':' - List of Stock Market Indexes',
                    '5':' - List of Government Bonds',
                    '6':' - Individual Market (stock, index, currency, commodity or bond)',
                    '7':' - Multiple Markets',
                    '8':' - List of stocks by country',
                    '9':' - A snapshot of latest peers prices by market',
                    '10':' - Stock Market Index Components',
                    '11':' - Search method',
                    '12':' - Filtering by Category',
                    '13':' - Historical Data for 1 instrument',
                    '14':' - Historical Data by date range',
                    '15':' - Intraday prices for a single instrument',
                    '16':' - Intraday prices by date and hour',
                    '17':' - Intraday prices by date',
                    '18':' - Aggregate intraday prices by interval - allowed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h',
                    '19':' - Market forecasts for major stock market indexes',
                    '20':' - Market forecasts for major exchange rates',
                    '21':' - Market forecasts for major commodities',
                    '22':' - Market forecasts for major bonds',
                    '23':' - Major market forecasts by symbol',
                    '24':' - Default earnings calendar',
                    '25': ' - Earnings calendar by start date',
                    '26': ' - Earnings calendar by instrument and start date',
                    '27': ' - Earnings calendar by instrument and date range',
                    '28': ' - Earnings calendar by country',
                    '29': ' - Financials companies list',
                    '30': ' - Financials companies list filtered by country',
                    '31': ' - Financials companies list filtered by more than one country (MAX countries = 5)',
                    '32': ' - Financials data by stock symbol',
                    '33': ' - Financials historical data',
                    '34': ' - Back to Main Menu'
                    
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
                    data_response=te.getMarketsData(marketsField='commodities', output_type=selected_output_type)

                if number == '2':
                    
                    data_response=te.getMarketsData(marketsField='currency', output_type=selected_output_type)
                
                if number == '3':
                    data_response=te.getCurrencyCross(cross='eur', output_type=selected_output_type)
                
                if number == '4':
                    data_response=te.getMarketsData(marketsField='index', output_type=selected_output_type)
                
                if number == '5':
                    data_response=te.getMarketsData(marketsField='bond', output_type=selected_output_type)
                
                if number == '6':
                    selected_symbol = section.select('symbol','aapl:us')
                    data_response=te.getMarketsBySymbol(symbols=selected_symbol, output_type=selected_output_type)

                if number == '7':
                    selected_symbols = section.select_symbol_list('aapl:us,indu:ind')
                    data_response=te.getMarketsBySymbol(symbols=selected_symbols, output_type=selected_output_type)
                    
                if number == '8':
                    selected_country = section.select('country','united states')
                    data_response=te.getMarketsSearch(country=selected_country, output_type=selected_output_type)
                    
                if number == '9':
                    selected_symbol = section.select('symbol','aapl:us')
                    data_response=te.getMarketsPeers(symbols=selected_symbol, output_type=selected_output_type)
                
                if number == '10':
                    selected_symbols = section.select_symbol_list('psi20:ind')
                    data_response=te.getMarketsComponents(symbols=selected_symbols, output_type=selected_output_type)
                
                if number == '11':
                    selected_country = section.select('country','united states')
                    data_response=te.getMarketsSearch(country=selected_country, output_type=selected_output_type)
                
                if number == '12':
                    selected_country = section.select('country','united states')
                    selected_category = section.select_category_list('index,markets')
                    data_response=te.getMarketsSearch(country=selected_country,
                                                         category=selected_category,
                                                         output_type=selected_output_type)
                
                if number == '13':
                    selected_symbols = section.select_symbol_list('aapl:us,indu:ind')
                    data_response=te.fetchMarkets(symbol=selected_symbols, output_type=selected_output_type)

                if number == '14':
                    selected_symbols = section.select_symbol_list('aapl:us,indu:ind')
                    selected_dates = section.select_dates()
                    data_response=te.fetchMarkets(symbol=selected_symbols, 
                                                    initDate = selected_dates[0], 
                                                    endDate = selected_dates[1],
                                                    output_type=selected_output_type)

                if number == '15':
                    selected_symbol = section.select('symbol','aapl:us' )
                    data_response=te.getMarketsIntraday(symbols=selected_symbol, output_type=selected_output_type)
                    
                if number == '16':
                    selected_symbol = section.select('symbol', 'indu:ind')
                    selected_init_date = section.select_init_date('2018-03-13 15:30')
                    data_response=te.getMarketsIntraday(symbols =selected_symbol , 
                                                        initDate=selected_init_date, 
                                                        output_type=selected_output_type)
                
                if number == '17':
                    selected_symbols = section.select_symbol_list('aapl:us, indu:ind')
                    selected_dates = section.select_dates()
                    data_response=te.getMarketsIntraday(symbols = selected_symbols,
                                                         initDate=selected_dates[0], 
                                                         endDate=selected_dates[1], 
                                                         output_type = selected_output_type)
                
                if number == '18':
                    selected_symbol = section.select('symbol','CL1:COM')
                    selected_interval = section.select('interval','1m')
                    selected_dates = section.select_dates()
                    data_response=te.getMarketsIntradayByInterval(symbol=selected_symbol,
                                                                    interval=selected_interval,
                                                                    initDate=selected_dates[0],
                                                                    endDate=selected_dates[1],
                                                                    output_type=selected_output_type)
                
                if number == '19':
                    data_response=te.getMarketsForecasts(category = 'index', output_type=selected_output_type)
                
                if number == '20':
                    data_response=te.getMarketsForecasts(category = 'currency', output_type=selected_output_type)
                
                if number == '21':
                    data_response=te.getMarketsForecasts(category = 'commodity', output_type=selected_output_type)
                
                if number == '22':
                    data_response=te.getMarketsForecasts(category = 'bond', output_type=selected_output_type)

                if number == '23':
                    selected_symbols = section.select_symbol_list('psi20:ind', 'indu:ind')
                    data_response=te.getMarketsForecasts(symbol = selected_symbols, output_type = selected_output_type)

                if number == '24':
                    data_response=te.getEarnings(output_type=selected_output_type)

                if number == '25':
                    selected_init_date = section.select_init_date('2016-01-01')
                    data_response=te.getEarnings(initDate=selected_init_date, output_type=selected_output_type)

                if number == '26':
                    selected_symbol = section.select('symbol','aapl:us')
                    selected_init_date = section.select_init_date()
                    data_response=te.getEarnings(symbols=selected_symbol,
                                                initDate=selected_init_date, 
                                                output_type=selected_output_type)

                if number == '27':
                    selected_symbol = section.select('symbol','aapl:us')
                    selected_dates = section.select_dates()
                    data_response=te.getEarnings(symbols = selected_symbol, 
                                                initDate=selected_dates[0], 
                                                endDate=selected_dates[1], 
                                                output_type=selected_output_type)
                
                if number == '28':
                    selected_country = section.select('country','united states' )
                    data_response=te.getEarnings(country = selected_country, output_type=selected_output_type)
                
                if number == '29':
                    data_response=te.getFinancialsData(output_type=selected_output_type)

                if number == '30':
                    selected_country = section.select('country','united states')
                    data_response=te.getFinancialsData(country=selected_country,output_type=selected_output_type)

                if number == '31':
                    selected_countries = section.select_countries('brazil, germany')
                    data_response=te.getFinancialsData(country=selected_countries,output_type=selected_output_type)
                
                if number == '32':
                    selected_symbol = section.select('symbol', 'aapl:us')
                    data_response=te.getFinancialsData(symbol=selected_symbol,output_type=selected_output_type)

                if number == '33':
                    selected_symbol = section.select('symbol', 'aapl:us')
                    selected_category = section.select('category','assets')
                    data_response=te.getHistoricalFinancials(symbol=selected_symbol, 
                                                            category=selected_category, 
                                                            output_type=selected_output_type)

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
    
    
                






         

        
        
        

    

    

    
    

    

        



    

    

