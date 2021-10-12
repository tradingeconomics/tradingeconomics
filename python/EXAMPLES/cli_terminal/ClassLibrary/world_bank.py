import tradingeconomics as te
import time

from .section import Section

class WorldBank():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - WorldBank  ********'
        self.section_name = 'WorldBank'
        
        self.dictionary={
                    '1':' - List of Main categories',
                    '2':' - Filtering by the main categories',
                    '3':' - Detailed information about specific indicator for all countries using a series code from the previous option',
                    '4':' - List of indicators available for a specific country',
                    '5':' - Detailed information just for a specific indicator and country by using series code',
                    '6':' - Detailed information just for a specific indicator and country by using url',
                    '7':' - Historical data for a specific indicator',
                    '8': ' - Back to Main Menu'
                    
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
                    data_response=te.getWBCategories(output_type=selected_output_type)

                if number == '2':
                    selected_indicator = section.select('indicatior','education')
                    data_response=te.getWBCategories(category=selected_indicator,output_type=selected_output_type)
                
                if number == '3':
                    selected_series_code = section.select('series code','SE.ADT.1524.LT.FE.ZS')
                    data_response=te.getWBIndicator(series_code = selected_series_code, output_type = selected_output_type)
                
                if number == '4':
                    selected_country = section.select('country','portugal')
                    data_response=te.getWBCountry(country = selected_country, output_type = selected_output_type)
                
                if number == '5':
                    selected_series_code = section.select('series code','usa.fr.inr.rinr')
                    data_response=te.getWBIndicator(series_code = selected_series_code, output_type = selected_output_type)
                
                if number == '6':
                    selected_url = section.select('url','/united-states/real-interest-rate-percent-wb-data.html')
                    data_response=te.getWBIndicator( url = selected_url, output_type = selected_output_type)

                if number == '7':
                    selected_series_code = section.select('series code','usa.fr.inr.rinr')
                    data_response=te.getWBHistorical(series_code =selected_series_code, output_type = selected_output_type)
                    
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
                






         

        
        
        

    

    

    
    

    

        



    

    

