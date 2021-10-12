import tradingeconomics as te
from .section import Section

class EconomicCalendar():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Economic calendar  ********'
        self.section_name = 'Economic calendar'
        self.dictionary={
                    '1':' - All calendar events ',
                    '2':' - All calendar events by importance (1-Low, 2-Medium, 3-High) ',
                    '3':' - Filter calendar events by date  ',
                    '4':' - Filter calendar events by date and importance',
                    '5':' - Calendar events for specific country ',
                    '6':' - Calendar events for specific by country and importance  ',
                    '7':' - Calendar events for specific country and date and importance',
                    '8':' - Calendar events for a specific indicator',
                    '9':' - Historical data by ID and a start date ',
                    '10':' - Historical data by ID and a date range ',
                    '11':' - Calendar events for a specific indicator and by importance',
                    '12':' - All calendar events for multiple countries',
                    '13':' - All calendar events for multiple countries and importance',
                    '14':' - All calendar events for multiple countries and by date',
                    '15':' - All calendar events for multiple countries and importance and by date',
                    '16':' - Calendar events for a specific country and specific indicator',
                    '17':' - Calendar events for a specific country and specific indicator and date',
                    '18':' - Filter calendar events by calendar ID',
                    '19':' - Filter calendar events by ticker',
                    '20':' - Filter calendar events by ticker and date',
                    '21':' - Back to Main Menu'
                    
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
                    data_response=te.getCalendarData(output_type=selected_output_type)

                if number == '2':
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(importance=selected_importance, output_type=selected_output_type)
                
                if number == '3':
                    
                    selected_dates = section.select_dates()
                    data_response=te.getCalendarData(country='all', initDate = selected_dates[0], endDate = selected_dates[1], output_type=selected_output_type)
                
                if number == '4':
                    selected_importance = section.select_importance()
                    selected_dates = section.select_dates()

                    data_response=te.getCalendarData(initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '5':
                    selected_country = section.select('country','portugal')
                    data_response=te.getCalendarData(country=selected_country,  output_type=selected_output_type)
                
                if number == '6':
                    selected_country = section.select('country','portugal')
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(country=selected_country,importance=selected_importance, output_type=selected_output_type)

                if number == '7':
                    selected_country = section.select('country','portugal')
                    selected_dates = section.select_dates()
                    data_response=te.getCalendarData(country = selected_country, initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                    
                if number == '8':
                    selected_country = section.select('country','portugal')
                    selected_dates = section.select_dates()
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(country=selected_country,initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                    
                if number == '9':
                    
                    selected_indicator =section.select('indicator','Inflation Rate')
                    data_response=te.getCalendarData(category=selected_indicator, output_type=selected_output_type)
                
                if number == '10':
                    selected_indicator =section.select('indicator','Inflation Rate')
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(category=selected_indicator,importance=selected_importance, output_type=selected_output_type)
        
                if number == '11':
                    selected_indicator =section.select('indicator','Inflation Rate')
                    selected_dates = section.select_dates()

                    data_response=te.getCalendarData(category=selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                
                if number == '12':
                    selected_indicator =section.select('indicator','Inflation Rate')
                    selected_dates = section.select_dates()
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(category=selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '13':
                    selected_countries = section.select_countries()
                    data_response=te.getCalendarData(country = selected_countries, output_type=selected_output_type)

                if number == '14':
                    selected_countries = section.select_countries()
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(country=selected_countries, importance=selected_importance, output_type=selected_output_type)

                if number == '15':
                    selected_countries = section.select_countries()
                    selected_dates = section.select_dates()
                    data_response=te.getCalendarData(country=selected_countries, initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                    
                if number == '16':
                    selected_countries = section.select_countries()
                    selected_dates = section.select_dates()
                    selected_importance = section.select_importance()
                    data_response=te.getCalendarData(country=selected_countries, initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '17':
                    selected_country = section.select('country','portugal')
                    selected_indicator =section.select('indicator','Inflation Rate')
                    data_response=te.getCalendarData(country = selected_country, category = selected_indicator, output_type=selected_output_type)
                
                if number == '18':
                    selected_country = section.select('country','portugal')
                    selected_indicator =section.select('indicator','Inflation Rate')
                    selected_dates = section.select_dates()
                    data_response=te.getCalendarData(country = selected_country, category = selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                
                if number == '19':
                    selected_id = section.select_id_list()
                    data_response=te.getCalendarId(id=selected_id, output_type=selected_output_type)
                
                if number == '20':
                    selected_ticker = section.select_ticker_list('IJCUSA,SPAINFACORD,BAHRAININFNRATE')
                    data_response=te.getCalendarData(ticker=selected_ticker, output_type=selected_output_type)
                
                if number == '21':
                    selected_ticker = section.select_ticker_list('IJCUSA,SPAINFACORD,BAHRAININFNRATE')
                    selected_dates = section.select_dates()
                    data_response=te.getCalendarData(ticker=selected_ticker, initDate=selected_dates[0], endDate=selected_dates[1],output_type=selected_output_type)
                

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
                






         

        
        
        

    

    

    
    

    

        



    

    

