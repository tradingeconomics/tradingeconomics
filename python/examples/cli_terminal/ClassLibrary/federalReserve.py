import tradingeconomics as te
import time

from .section import Section

class FederalReserve():

    
        
    
    def __init__(self, key):
        self.key=key
    
        def selectFunction(self):
            section = Section()
            list_of_number = [item for item in range(1, 13)]
            number = ''
            economic_calendar_function_dictionary={
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
                    '12':' - Back to MAIN MENU'
                    
                    }

                
            print( '******* Trading Economics - Economic Calendar  ********')
            
            for x,y in economic_calendar_function_dictionary.items():
                print (x,y)
                
            number = input('Choose a Function Number:')
            print('you have selected ' + number)

            if int(number) not in list_of_number:
                print('**************************************************')
                print(f'{number} is not a valid option. Try again.')
                return True

            if number == '12':
                return False

            selected_output_type = section.selectOutputType()


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
                    
                    selected_symbol =section.selectSymbolList('symbol','racedisparity005007,2020ratio002013')
                    data_response=te.getFedRHistorical(symbol=selected_symbol, output_type=selected_output_type)
                
                if number == '10':
                    selected_symbol =section.selectSymbolList('racedisparity005007,2020ratio002013')
                    selected_dates = section.selectDates()
                    data_response=te.getFedRHistorical(symbol=selected_symbol,initDate=selected_dates[0], endDate=selected_dates[1],output_type=selected_output_type)
        
                if number == '11':
                    selected_symbol =section.selectSymbolList('racedisparity005007,2020ratio002013')
                    selected_init_date = section.selectInitDate()

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
        while function_selected:
            function_selected=selectFunction(self)
            if function_selected == False:
                return
            if function_selected == 'continue_or_back_to_main_menu':
                print('**************************************************')
                print ('(1) - new Economic Calendar Request \nor \n(2) - back to MAIN MENU')
                if input('--> ') == '2':
                    return
                






         

        
        
        

    

    

    
    

    

        



    

    

