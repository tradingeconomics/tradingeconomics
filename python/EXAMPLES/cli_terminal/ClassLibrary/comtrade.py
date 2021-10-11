import tradingeconomics as te
import time

from .section import Section

class Comtrade():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Comtrade  ********'
        self.section_name = 'Comtrade'
        self.dictionary={
             '1' : ' - Comtrade categories ',
             '2' : ' - Total Imports by main category', 
             '3' : '  - Total Exports by main category ',
             '4' : '  - Imports by specific category ',
             '5' : '  - Exports by specific category', 
             '6' : '  - Get detailed information about Comtrade Countries', 
             '7' : '  - Snapshot of data per country', 
             '8' : '  - Snapshot of data per country filtered by type: import or export', 
             '9' : '  - Snapshot of trade between two countries', 
             '10' : '  - Snapshot of trade between two countries filtered by type: import or export', 
             '11' : '  - Total Imports by country', 
             '12' : '  - Total Exports by country ',
             '13' : '  - Historical data', 
             '14' : '  - Back to Main Menu ' 

            }
    
        def selectFunction(self):
            section = Section()
            te.login(self.key)
            list_of_number = self.dictionary.keys()
            number = ''
            
                
            print( '************** Trading Economics - COMTRADE  **************')
            for x,y in self.dictionary.items():
                print (x,y)
            
            number = input('Choose a Function Number:')
            print('you have selected ' + number)

            if number not in list_of_number:
                print('**************************************************')
                print(f'{number} is not a valid option. Try again.')
                return True

            if number == '14':
                return False

            selected_output_type = section.select_output_type()

            try:
                data_response = ''
                if number == '1':
                    data_response=te.getCmtCategories(output_type=selected_output_type)

                if number == '2':
                    selected_country = section.select('country','portugal')
                    
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'import',  output_type = selected_output_type )
                
                if number == '3':
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'export',  output_type = selected_output_type )
                
                if number == '4':
                    selected_category = section.select('category','Coffee, tea, mate and spices')
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'import', category = selected_category, output_type = selected_output_type )
                
                if number == '5':
                    selected_category = section.select('category','Coffee, tea, mate and spices')
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'export', category = selected_category, output_type = selected_output_type )
                
                if number == '6':
                    data_response=te.getCmtCountry(output_type=selected_output_type)

                if number == '7':
                    selected_country = section.select('country','portugal')
                    data_response=te.getCmtCountry(country = selected_country , output_type = selected_output_type)
                    
                if number == '8':
                    selected_country = section.select('country','portugal')
                    selected_import_export =section.select_import_export()
                    data_response=te.getCmtCountryFilterByType(country1 = selected_country, type = selected_import_export, output_type=selected_output_type)
                    
                if number == '9':
                    selected_countries = section.select_two_countries()
                    data_response=te.getCmtTwoCountries(country1 = selected_countries[0], country2 = selected_countries[1], output_type = selected_output_type)
                
                if number == '10':
                    selected_countries = section.select_two_countries()
                    selected_import_export =section.select_import_export()
                    data_response=te.getCmtCountryFilterByType(country1=selected_countries[0], country2=selected_countries[1],type=selected_import_export, output_type=selected_output_type)
        
                if number == '11':
                    selected_country = section.select('country','portugal')
                    data_response=te.getTotalByType(country = selected_country, type = 'import', output_type = selected_output_type )
                
                if number == '12':
                    selected_country = section.select('country','portugal')
                    data_response=te.getTotalByType(country = selected_country, type = 'export', output_type = selected_output_type )
                
                if number == '13':
                    selected_symbol = section.select('symbols','PRTESP24031')
                    data_response=te.getCmtHistorical(symbol=selected_symbol, output_type=selected_output_type)
                    
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
        while function_selected:
            function_selected=selectFunction(self)
            if function_selected == False:
                return
            if function_selected == 'continue_or_back_to_main_menu':
                print('**************************************************')
                print (f'(1) - new {self.section_name} Request \nor \n(2) - back to MAIN MENU')
                if input('--> ') == '2':
                    return
                






         

        
        
        

    

    

    
    

    

        



    

    

