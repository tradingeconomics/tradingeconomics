import tradingeconomics as te
from .section import Section

class Comtrade:
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Comtrade  ********'
        self.section_name = 'Comtrade'
        self.dictionary={
             '1' : ' - Comtrade categories ',
             '2' : ' - Total Imports by main category', 
             '3' : ' - Total Exports by main category ',
             '4' : ' - Imports by specific category ',
             '5' : ' - Exports by specific category', 
             '6' : ' - Get detailed information about Comtrade Countries', 
             '7' : ' - Snapshot of data per country', 
             '8' : ' - Snapshot of data per country filtered by type: import or export', 
             '9' : ' - Snapshot of trade between two countries', 
             '10' : ' - Snapshot of trade between two countries filtered by type: import or export', 
             '11' : ' - Total Imports by country', 
             '12' : ' - Total Exports by country ',
             '13' : ' - Historical data', 
             '14' : ' - Back to Main Menu' 

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
                    data_response=te.getCmtCategories(output_type=selected_output_type)

                if number == '2':
                    selected_country = section.select('country','portugal')
                    
                    data_response=te.getCmtCountryByCategory(country = selected_country,
                                                             type = 'import',  
                                                             output_type = selected_output_type )
                
                if number == '3':
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, 
                                                            type = 'export',  
                                                            output_type = selected_output_type )
                
                if number == '4':
                    selected_category = section.select('category','Coffee, tea, mate and spices')
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, 
                                                            type = 'import', 
                                                            category = selected_category, 
                                                            output_type = selected_output_type )
                
                if number == '5':
                    selected_category = section.select('category','Coffee, tea, mate and spices')
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, 
                                                            type = 'export', 
                                                            category = selected_category, 
                                                            output_type = selected_output_type )
                
                if number == '6':
                    data_response=te.getCmtCountry(output_type=selected_output_type)

                if number == '7':
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountry(country = selected_country , 
                                                    output_type = selected_output_type)
                    
                if number == '8':
                    selected_country = section.select('country','portugal')
                    selected_import_export =section.select_import_export()
                    data_response=te.getCmtCountryFilterByType(country1 = selected_country, 
                                                                type = selected_import_export, 
                                                                output_type=selected_output_type)
                    
                if number == '9':
                    selected_countries = section.select_two_countries()
                    data_response=te.getCmtTwoCountries(country1 = selected_countries[0], 
                                                        country2 = selected_countries[1], 
                                                        output_type = selected_output_type)
                
                if number == '10':
                    selected_countries = section.select_two_countries()
                    selected_import_export =section.select_import_export()
                    data_response=te.getCmtCountryFilterByType(country1=selected_countries[0], 
                                                                country2=selected_countries[1],
                                                                type=selected_import_export, 
                                                                output_type=selected_output_type)
        
                if number == '11':
                    selected_country = section.select('country','portugal')
                    data_response=te.getTotalByType(country = selected_country, 
                                                    type = 'import', 
                                                    output_type = selected_output_type )
                
                if number == '12':
                    selected_country = section.select('country','portugal')
                    data_response=te.getTotalByType(country = selected_country, 
                                                    type = 'export', 
                                                    output_type = selected_output_type )
                
                if number == '13':
                    selected_symbol = section.select('symbols','PRTESP24031')
                    data_response=te.getCmtHistorical(symbol=selected_symbol, 
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
                






         

        
        
        

    

    

    
    

    

        



    

    

