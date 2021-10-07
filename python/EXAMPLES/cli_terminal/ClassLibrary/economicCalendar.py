import tradingeconomics as te
import time

from .section import Section

class EconomicCalendar():

    
        
    
    def __init__(self, key):
        self.key=key
    
        def selectFunction(self):
            section = Section()
            list_of_number = [item for item in range(1, 22)]
            number = ''
                
            print( '******* Trading Economics - Economic Calendar  ********')
            print('(1) - All calendar events \n(2) - All calendar events by importance (1-Low, 2-Medium, 3-High) \n(3) - Filter calendar events by date \n(4) - Filter calendar events by date and importance \n(5) - Calendar events for specific country \n(6) - Calendar events for specific by country and importance \n(7) - Calendar events for specific country and date and importance \n(8) - Calendar events for a specific indicator \n(9) - Calendar events for a specific indicator and by importance \n(10) - Calendar events for a specific indicator and by date \n(11) - Calendar events for a specific indicator and by date and by importance \n(12) - All calendar events for multiple countries \n(13) - All calendar events for multiple countries and importance \n(14) - All calendar events for multiple countries and by date \n(15) - All calendar events for multiple countries and importance and by date \n(16) - Calendar events for a specific country and specific indicator \n(17) - Calendar events for a specific country and specific indicator and date \n(18) - Filter calendar events by calendar ID \n(19) - Filter calendar events by ticker \n(20) - Filter calendar events by ticker and date \n(21) - Back to MAIN MENU'  )
            number = input('Choose a Function Number:')
            print('you have selected ' + number)

            if int(number) not in list_of_number:
                print('**************************************************')
                print(f'{number} is not a valid option. Try again.')
                return True

            if number == '21':
                return False

            selected_output_type = section.selectOutputType()


            try:
                data_response = ''
                if number == '1':
                    data_response=te.getCalendarData(output_type=selected_output_type)

                if number == '2':
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(importance=selected_importance, output_type=selected_output_type)
                
                if number == '3':
                    
                    selected_dates = section.selectDates()
                    data_response=te.getCalendarData(country='all', initDate = selected_dates[0], endDate = selected_dates[1], output_type=selected_output_type)
                
                if number == '4':
                    selected_importance = section.selectImportance()
                    selected_dates = section.selectDates()

                    data_response=te.getCalendarData(initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '5':
                    selected_country = section.selectCountry()
                    data_response=te.getCalendarData(country=selected_country,  output_type=selected_output_type)
                
                if number == '6':
                    selected_country = section.selectCountry()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(country=selected_country,importance=selected_importance, output_type=selected_output_type)

                if number == '7':
                    selected_country = section.selectCountry()
                    selected_dates = section.selectDates()
                    data_response=te.getCalendarData(country = selected_country, initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                    
                if number == '8':
                    selected_country = section.selectCountry()
                    selected_dates = section.selectDates()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(country=selected_country,initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                    
                if number == '9':
                    
                    selected_indicator =section.selectIndicator()
                    data_response=te.getCalendarData(category=selected_indicator, output_type=selected_output_type)
                
                if number == '10':
                    selected_indicator =section.selectIndicator()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(category=selected_indicator,importance=selected_importance, output_type=selected_output_type)
        
                if number == '11':
                    selected_indicator =section.selectIndicator()
                    selected_dates = section.selectDates()

                    data_response=te.getCalendarData(category=selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                
                if number == '12':
                    selected_indicator =section.selectIndicator()
                    selected_dates = section.selectDates()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(category=selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '13':
                    selected_countries = section.selectCountries()
                    data_response=te.getCalendarData(country = selected_countries, output_type=selected_output_type)

                if number == '14':
                    selected_countries = section.selectCountries()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(country=selected_countries, importance=selected_importance, output_type=selected_output_type)

                if number == '15':
                    selected_countries = section.selectCountries()
                    selected_dates = section.selectDates()
                    data_response=te.getCalendarData(country=selected_countries, initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                    
                if number == '16':
                    selected_countries = section.selectCountries()
                    selected_dates = section.selectDates()
                    selected_importance = section.selectImportance()
                    data_response=te.getCalendarData(country=selected_countries, initDate=selected_dates[0], endDate=selected_dates[1],importance=selected_importance, output_type=selected_output_type)
                
                if number == '17':
                    selected_country = section.selectCountry()
                    selected_indicator =section.selectIndicator()
                    data_response=te.getCalendarData(country = selected_country, category = selected_indicator, output_type=selected_output_type)
                
                if number == '18':
                    selected_country = section.selectCountry()
                    selected_indicator =section.selectIndicator()
                    selected_dates = section.selectDates()
                    data_response=te.getCalendarData(country = selected_country, category = selected_indicator,initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
                
                if number == '19':
                    selected_id = section.selectId()
                    data_response=te.getCalendarId(id=selected_id, output_type=selected_output_type)
                
                if number == '20':
                    selected_ticker = section.selectTicker()
                    data_response=te.getCalendarData(ticker=selected_ticker, output_type=selected_output_type)
                
                if number == '21':
                    selected_ticker = section.selectTicker()
                    selected_dates = section.selectDates()
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
        while function_selected:
            function_selected=selectFunction(self)
            if function_selected == False:
                return
            if function_selected == 'continue_or_back_to_main_menu':
                print('**************************************************')
                print ('(1) - new Economic Calendar Request \nor \n(2) - back to MAIN MENU')
                if input('--> ') == '2':
                    return
                






         

        
        
        

    

    

    
    

    

        



    

    

