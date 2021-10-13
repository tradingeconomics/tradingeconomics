import tradingeconomics as te
from .section import Section

class News():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - News  ********'
        self.section_name = 'News'
        
        self.dictionary={
                    '1':' - Latest news',
                    '2':' - News by country',
                    '3':' - News by indicator',
                    '4':' - News by country and indicator',
                    '5':' - Paginate news list by specifying start index and list size',
                    '6':' - News filtered by date range',
                    '7':' - News filtered by date range and Indicator',
                    '8':' - News by multiple indicators',
                    '9':' - News by multiple countries and multiple indicators',
                    '10':' - News by multiple countries',
                    '11': ' - Back to Main Menu'
                    
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
                    data_response=te.getNews(output_type=selected_output_type)

                if number == '2':
                    selected_country = section.select('country', 'united states')
                    data_response=te.getNews(country=selected_country,output_type=selected_output_type)
                
                if number == '3':
                    selected_indicator = section.select('indicator', 'inflation rate')
                    data_response=te.getNews(indicator=selected_indicator,output_type=selected_output_type)
                
                if number == '4':
                    selected_country = section.select('country', 'united states')
                    selected_indicator = section.select('indicator', 'inflation rate')
                    data_response=te.getNews(country=selected_country, indicator=selected_indicator, output_type=selected_output_type)
                
                if number == '5':
                    selected_start_index = section.select('start index', '15')
                    selected_list_size = section.select('list size', '15')
                    data_response=te.getNews(start=selected_start_index, limit=selected_list_size, output_type=selected_output_type)
                
                if number == '6':
                    selected_dates = section.select_dates()
                    data_response=te.getNews(start_date=selected_dates[0], end_date=selected_dates[1], output_type=selected_output_type)

                if number == '7':
                    
                    selected_indicator = section.select('indicator', 'inflation rate')
                    selected_dates = section.select_dates()
                    data_response=te.getNews(indicator=selected_indicator,
                                                 start_date=selected_dates[0], 
                                                 end_date=selected_dates[1],
                                                 output_type=selected_output_type)
                    
                if number == '8':
                    selected_indicator_list = section.select_indicators_list('inflation rate,gdp')
                    data_response=te.getNews(indicator=selected_indicator_list, output_type=selected_output_type)
                    
                if number == '9':
                    selected_countries = section.select_countries('brazil,canada')
                    selected_indicator_list = section.select_indicators_list('Housing Starts,Stock Market')
                    selected_dates = section.select_dates()
                    data_response=te.getNews(country=selected_countries,
                                             indicator=selected_indicator_list,
                                             start_date=selected_dates[0], 
                                             end_date=selected_dates[1], 
                                             output_type=selected_output_type)
                
                if number == '10':
                    selected_countries = section.select_countries('brazil,canada')
                    data_response=te.getNews(country=selected_countries, output_type=selected_output_type)
                

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
                

    
                






         

        
        
        

    

    

    
    

    

        



    

    

