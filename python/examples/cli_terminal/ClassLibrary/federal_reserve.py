import tradingeconomics as te
from .section import Section

class FederalReserve():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Federal Reserve  ********'
        self.section_name = 'Federal Reserve'

        self.dictionary={
                    '1':' - List of all US states ',
                    '2':' - List of all counties per state',
                    '3':' - Data by Symbol',
                    '4':' - data by URL',
                    '5':' - Data for the entire United States',
                    '6':' - Data by State',
                    '7':' - Data by County',
                    '8':' - Data to Pike County',
                    '9':' - Data Only accessed through symbol or list of symbols',
                    '10':' - Data By symbol and a date range',
                    '11':' - Data by symbol and a start date',
                    '12':' - Back to Main Menu'
                    
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
                    data_response=te.getFedRStates(output_type=selected_output_type)

                if number == '2':
                    selected_county = section.select('county')
                    data_response=te.getFedRStates(county = selected_county, output_type = selected_output_type)
                
                if number == '3':
                    
                    selected_symbol = section.select('symbol', 'ALLMARGATTN')
                    data_response=te.getFedRSnaps(symbol=selected_symbol, output_type=selected_output_type)
                
                if number == '4':
                    selected_url = section.select('url','url=/united-states/all-marginally-attached-workers-for-tennessee-fed-data.html')

                    data_response=te.getFedRSnaps(url=selected_url, output_type=selected_output_type)
                
                if number == '5':
                    
                    data_response=te.getFedRSnaps(country = 'united states', output_type = selected_output_type)

                
                if number == '6':
                    selected_state = section.select('state','tennessee')
                    data_response=te.getFedRSnaps(state =selected_state, output_type = selected_output_type)


                if number == '7':
                    selected_county = section.select('county','arkansas')
                    data_response=te.getFedRSnaps(county = selected_county, output_type = selected_output_type)
                    
                if number == '8':
                    data_response=te.getFedRCounty(output_type = selected_output_type)
                    
                if number == '9':
                    
                    selected_symbol =section.select_symbol_list('symbol','racedisparity005007,2020ratio002013')
                    data_response=te.getFedRHistorical(symbol=selected_symbol, output_type=selected_output_type)
                
                if number == '10':
                    selected_symbol =section.select_symbol_list('racedisparity005007,2020ratio002013')
                    selected_dates = section.select_dates()
                    data_response=te.getFedRHistorical(symbol=selected_symbol,initDate=selected_dates[0], endDate=selected_dates[1],output_type=selected_output_type)
        
                if number == '11':
                    selected_symbol =section.select_symbol_list('racedisparity005007,2020ratio002013')
                    selected_init_date = section.select_init_date()

                    data_response=te.getFedRHistorical(symbol=selected_symbol,initDate=selected_init_date,output_type=selected_output_type)
                

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
                






         

        
        
        

    

    

    
    

    

        



    

    

