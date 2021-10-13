

from datetime import *

class Section:
    def __init__(self) -> None:
        pass

    def select(self,variable, example):
        print('**************************************************')
        print(f'Insert "{variable}" for your request. Example: "{example}"')
        selected_variable = input('--> ')
        return selected_variable
        
    def select_output_type(self):
        output_type_dict = {
            '1':'raw',
            '2': 'df',
            '3': 'dict'
        }
        print('**************************************************')
        print('(1) - Raw \n(2) - DataFrame \n(3) - Dictionary ')
        status = True
        while status:
            try:
                selected_output = input('Select an output data type for your request: ')
                if selected_output in ['1','2','3']:
                    return output_type_dict[selected_output]

                print('Attention: Please, pick a number between 1 and 3. ')
                
            except:
                pass

    def select_import_export(self):
        output_type_dict = {
            '1':'Import',
            '2': 'Export'
            
        }
        print('**************************************************')
        print('(1) - Imports \n(2) - Exports')
        status = True
        while status:
            try:
                selected_output = input('Select an imports or exports for your request: ')
                if selected_output in ['1','2']:
                    return output_type_dict[selected_output]

                print('Attention: Please, pick  1 or 2. ')
                
            except:
                pass
    
    def select_two_countries(self):
        countries_list = []
        print('**************************************************')
        print('Insert a country 1 for you request: ')
        
        selected_country1 = input('--> ')
        
        countries_list.append(selected_country1)
        print('Insert a country 2 for you request: ')
        selected_country2 = input('--> ')
        countries_list.append(selected_country2)

        return countries_list

    def select_importance(self):
        output_type_dict = {
            '1':'1',
            '2': '2',
            '3': '3'
            
        }
        print('**************************************************')
        print('(1) - 1  \n(2) - 2 \n(3) - 3')
        status = True
        while status:
            try:
                selected_output = input('Select a number importance between 1 and 3 for your request: ')
                if selected_output in ['1','2','3']:
                    return output_type_dict[selected_output]

                print('Attention: Please, pick  1, 2 or 3. ')
                
            except:
                pass

    def select_dates(self):
        
        def validateDates(date):
            try:
                try:
                    datetime.strptime(date, '%Y-%m-%d')
                    dates_list.append(date)
                    return False

                except:
                    datetime.strptime(date, '%Y-%m-%d %H:%M')

            except ValueError:
                # raise selected_initial_date("Incorrect data format, should be YYYY-MM-DD")
                print( "Incorrect data format, should be YYYY-MM-DD")
                return True

        dates_list = []
        
        initial_date_status = True
        while initial_date_status:
            print('**************************************************')
            print('Insert a Initial Date for you request. Format Example ("2020-12-30"): ')
            selected_initial_date = input('--> ')
            initial_date_status = validateDates(selected_initial_date)
            

            
        end_date_status = True     
        while end_date_status:
            print('**************************************************')
            print('Insert a End Date for you request. Format Example ("2020-12-30"): ')
            selected_end_date = input('--> ')
            end_date_status = validateDates(selected_end_date)   
            
        
        
        return dates_list

    def select_category_group(self):
        print('**************************************************')
        print('Insert a Category Group for you request: Example : "poverty"')
        selected_category_group = input('--> ')
        return selected_category_group

    def select_id_list(self):
        print('**************************************************')
        print('Insert an ID or a list of IDs for you request: Examples "160025,160030,174108"')
        selected_id = input('--> ')
        id_list= selected_id.split(',')
        return id_list

    def select_category_list(self, example):
        print('**************************************************')
        print(f'Insert an category or a list of categories for you request: Examples "{example}"')
        selected_category = input('--> ')
        category_list= selected_category.split(',')
        return category_list

    def select_indicators_list(self,example):
        print('**************************************************')
        print(f'Insert an list of indicators for you request: Examples "{example}"')
        selected_id = input('--> ')
        id_list= selected_id.split(',')
        return id_list

    def select_symbol_list(self, example):
        print('**************************************************')
        print(f'Insert a symbol or a list of symbols for you request: Examples "{example}" ')
        selected_symbols = input('--> ')
        symbol_list= selected_symbols.split(',')
        return symbol_list

    def select_ticker_list(self, example):
        print('**************************************************')
        print(f'Insert a ticker or a list of tickers for you request: Examples "{example}"')
        selected_ticker = input('--> ')
        id_list= selected_ticker.split(',')
        return id_list

    def select_countries(self, example=None):
        print('**************************************************')
        print(f'Insert a list of countries for you request: Example: "{example}" ')
        selected_indicator = input('--> ')
        countries_list= selected_indicator.split(',')
        return countries_list

    def select_init_date(self,example = None):
        
        def validate_dates(date):
            try:
                try:
                    datetime.strptime(date, '%Y-%m-%d')
                    dates_list.append(date)
                    return False

                except:
                    datetime.strptime(date, '%Y-%m-%d %H:%M')

            except ValueError:
                # raise selected_initial_date("Incorrect data format, should be YYYY-MM-DD")
                print( "Incorrect data format, should be YYYY-MM-DD")
                return True

        dates_list = []
        
        initial_date_status = True
        while initial_date_status:
            print('**************************************************')
            print(f'Insert a Initial Date for you request. Format Example ("{example}"): ')
            selected_initial_date = input('--> ')
            initial_date_status = validate_dates(selected_initial_date)
        
        return dates_list[0]

    def first_section(self,section_title, section_dictionary, list_of_number):
                    
                    def number_selected():
                        print(section_title)
                        
                        for x,y in section_dictionary.items():
                            print (x,y)
                        number = input('Choose a Function Number:')
                        print('you have selected ' + number)

                        if number not in list_of_number:
                            print('**************************************************')
                            print(f'{number} is not a valid option. Try again.')
                            return True

                        return (number,False)
                    
                    response = True
                    while response:
                        selected_number = number_selected()
                        
                        if selected_number is not True:
                            response = selected_number[1]
                        else:

                            response = selected_number
                    
                    number = selected_number[0]
                    return number

    def new_request_or_back_to_menu(self, section_name):
        number_selected = 0
        while number_selected not in ['1','2']:
            print('**************************************************')
            print (f'(1) - new {section_name} Request \nor \n(2) - back to MAIN MENU')
            number_selected = input('-->')
        if number_selected == '1':
            return True
        return False
        




