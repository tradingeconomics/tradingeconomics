import tradingeconomics as te
import time

from .section import Section

class Search():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Search  ********'
        self.section_name = 'Search'
        
        self.dictionary={
                    '1':' - List of available categories',
                    '2':' - Search for term/keyword at a specific category',
                    '3':' - Search for term/keyword in all available categories',
                    '4': ' - Back to Main Menu'
                    
                    }
    
        def select_function(self):
            section = Section()
            te.login(self.key)
            list_of_number = self.dictionary.keys()
            number = ''
                
            print(self.title)
            
            for x,y in self.dictionary.items():
                print (x,y)
            number = input('Choose a Function Number:')
            print('you have selected ' + number)

            if number not in list_of_number:
                print('**************************************************')
                print(f'{number} is not a valid option. Try again.')
                return True
            
            all_dict_values = list(self.dictionary.values())
            back_to_main_menu_index = all_dict_values.index(' - Back to Main Menu')
            
            if number == str(back_to_main_menu_index + 1):
                return False

            selected_output_type = section.select_output_type()


            try:
                data_response = ''
                if number == '1':
                    data_response=te.getSearch(output_type=selected_output_type)

                if number == '2':
                    selected_term = section.select('term/keyword','japan')
                    selected_category = section.select('category','markets')
                    data_response=te.getSearch(term=selected_term,category=selected_category,output_type=selected_output_type)
                
                if number == '3':
                    selected_term = section.select('term/keyword','gold')
                    data_response=te.getSearch(term='gold',output_type=selected_output_type)
                
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
            function_selected=select_function(self)
            if function_selected == False:
                return
            if function_selected == 'continue_or_back_to_main_menu':
                print('**************************************************')
                print (f'(1) - new {self.section_name} Request \nor \n(2) - back to MAIN MENU')
                if input('--> ') == '2':
                    return
    
    def test(self):
        print ('test')
                






         

        
        
        

    

    

    
    

    

        



    

    

