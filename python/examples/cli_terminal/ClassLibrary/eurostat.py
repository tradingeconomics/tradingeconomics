import tradingeconomics as te
from .section import Section

class EuroStat():
    def __init__(self, key):
        self.key=key
        self.title = '******* Trading Economics - Euro Stat  ********'
        self.section_name = 'Euro Stat'

        self.dictionary={
                '1':'- List of countries available',
                '2':'- List of categories and category groups available',
                '3':'- Data by Category Group ',
                '4':'- Data by Category',
                '5':'- Eurostat data by Country',
                '6':'- Data by Country and category ',
                '7':'- Data by Country and category group ',
                '8':'- Historical data by ID ',
                '9':'- Historical data by ID and a start date ',
                '10':'- Historical data by ID and a date range ',
                '11':' - Back to Main Menu'
                
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
                    data_response=te.getEurostatCountries(output_type=selected_output_type)

                if number == '2':
                    data_response=te.getEurostatCategoryGroups(output_type=selected_output_type)
                
                if number == '3':
                    selected_category_group = section.select('category_group','Interest rates')
                    data_response=te.getEurostatData(category_group=selected_category_group, output_type=selected_output_type)
                
                if number == '4':
                    selected_category = section.select('category','	People at risk of income poverty after social transfers')
                    data_response=te.getEurostatData(category=selected_category, output_type=selected_output_type)
                
                if number == '5':
                    selected_country = section.select('country','portugal')
                    data_response=te.getEurostatData(country=selected_country, output_type=selected_output_type)
                
                if number == '6':
                    selected_country = section.select('country','portugal')
                    selected_category = section.select('category','	People at risk of income poverty after social transfers')
                    data_response=te.getEurostatData(country=selected_country, category=selected_category, output_type=selected_output_type)

                if number == '7':
                    selected_country = section.select('country','portugal')
                    selected_category_group = section.select('category_group','Interest rates')
                    data_response=te.getEurostatData(country=selected_country, category_group=selected_category_group, output_type=selected_output_type)
                    
                if number == '8':
                    selected_id = section.select('id','24804')
                    data_response=te.getHistoricalEurostat(ID=selected_id, output_type=selected_output_type)
                    
                if number == '9':
                    selected_id = section.select('id','24804')
                    selected_init_date =section.select_init_date()
                    data_response=te.getHistoricalEurostat(ID=selected_id, initDate=selected_init_date[0], output_type=selected_output_type)
                
                if number == '10':
                    selected_id = section.select('id','24804')
                    selected_dates = section.select_dates
                    data_response=te.getHistoricalEurostat(ID=selected_id, initDate=selected_dates[0], endDate=selected_dates[1], output_type=selected_output_type)
        
                

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
                






         

        
        
        

    

    

    
    

    

        



    

    

