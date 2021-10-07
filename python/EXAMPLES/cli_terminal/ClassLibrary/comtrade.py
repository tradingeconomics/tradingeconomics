import tradingeconomics as te
import time

from .section import Section

class Comtrade():

    
        
    
    def __init__(self, key):
        self.key=key
    
        def selectFunction(self):
            section = Section()
            list_of_number = [item for item in range(1, 15)]
            number = ''
                
            print( '************** Trading Economics - COMTRADE  **************')
            print('(1) - Comtrade categories \n(2) - Total Imports by main category \n(3) - Total Exports by main category \n(4) - Imports by specific category \n(5) - Exports by specific category \n(6) - Get detailed information about Comtrade Countries \n(7) - Snapshot of data per country \n(8) - Snapshot of data per country filtered by type: import or export \n(9) - Snapshot of trade between two countries \n(10) - Snapshot of trade between two countries filtered by type: import or export \n(11) - Total Imports by country \n(12) - Total Exports by country \n(13) - Historical data \n(14) - Back to Main Menu ' )
            number = input('Choose a Function Number:')
            print('you have selected ' + number)

            if int(number) not in list_of_number:
                print('**************************************************')
                print(f'{number} is not a valid option. Try again.')
                return True

            if number == '14':
                return False

            selected_output_type = section.selectOutputType()

            

            try:
                data_response = ''
                if number == '1':
                    data_response=te.getCmtCategories(output_type=selected_output_type)

                if number == '2':
                    selected_country = section.selectCountry()
                    
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'import',  output_type = selected_output_type )
                
                if number == '3':
                    selected_country = section.selectCountry()
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'export',  output_type = selected_output_type )
                
                if number == '4':
                    selected_category = section.selectCategory(selected_output_type)
                    selected_country = section.selectCountry()
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'import', category = selected_category, output_type = selected_output_type )
                
                if number == '5':
                    selected_category = section.selectCategory(selected_output_type)
                    selected_country = section.selectCountry()
                    data_response=te.getCmtCountryByCategory(country = selected_country, type = 'export', category = selected_category, output_type = selected_output_type )
                
                if number == '6':
                    data_response=te.getCmtCountry(output_type=selected_output_type)

                if number == '7':
                    selected_country = section.selectCountry()
                    data_response=te.getCmtCountry(country = selected_country , output_type = selected_output_type)
                    
                if number == '8':
                    selected_country = section.selectCountry()
                    selected_import_export =section.selectImportExport()
                    data_response=te.getCmtCountryFilterByType(country1 = selected_country, type = selected_import_export, output_type=selected_output_type)
                    
                if number == '9':
                    selected_countries = section.selectTwoCountries()
                    data_response=te.getCmtTwoCountries(country1 = selected_countries[0], country2 = selected_countries[1], output_type = selected_output_type)
                
                if number == '10':
                    selected_countries = section.selectTwoCountries()
                    selected_import_export =section.selectImportExport()
                    data_response=te.getCmtCountryFilterByType(country1=selected_countries[0], country2=selected_countries[1],type=selected_import_export, output_type=selected_output_type)
        
                if number == '11':
                    selected_country = section.selectCountry()
                    data_response=te.getTotalByType(country = selected_country, type = 'import', output_type = selected_output_type )
                
                if number == '12':
                    selected_country = section.selectCountry()
                    data_response=te.getTotalByType(country = selected_country, type = 'export', output_type = selected_output_type )
                
                if number == '13':
                    selected_symbol = section.selectSymbol()
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
                print ('(1) - new Comtrade Request \nor \n(2) - back to MAIN MENU')
                if input('--> ') == '2':
                    return
                






         

        
        
        

    

    

    
    

    

        



    

    

