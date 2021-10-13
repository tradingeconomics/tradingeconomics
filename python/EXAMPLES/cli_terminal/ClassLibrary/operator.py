import tradingeconomics as te
import ClassLibrary as cl
from .section import *

class Operator:
    def __init__(self,key):
        self.key =key
        self.title = '************** Trading Economics - MAIN MENU -  **************'
        self.section_name = 'MAIN MENU'
        self.dictionary={
            '1': ' - Comtrade', 
            '2' : ' - Economic Calendar', 
            '3' : ' - EuroStat ',
            '4' : ' - Federal Reserve ',
            '5' : ' - Indicators ',
            '6' : ' - Markets ',
            '7' : ' - News ',
            '8' : ' - Search ',
            '9' : ' - World Bank ',
            '10' : ' - EXIT' 
            }

        def select_section(self):
            section = Section()
            list_of_number = self.dictionary.keys()
            selected_session = ''
            
            selected_session = section.first_section(section_title=self.title,
                                    section_dictionary=self.dictionary,
                                    list_of_number = list_of_number)

            if selected_session == '10':
                return False    

            if selected_session == '1':
                return cl.Comtrade(self.key)

            if selected_session == '2':
                return cl.EconomicCalendar(self.key)

            if selected_session == '3':
                return cl.EuroStat(self.key)

            if selected_session == '4':
                return cl.FederalReserve(self.key)

            if selected_session == '5':
                return cl.Indicators(self.key)

            if selected_session == '6':
                return cl.Markets(self.key)

            if selected_session == '7':
                return cl.News(self.key)
            
            if selected_session == '8':
                return cl.Search(self.key)
            
            if selected_session == '9':
                return cl.WorldBank(self.key)



            return selected_session

        
        selected_session = True
        while selected_session:
            selected_session= select_section(self)
            
           

        
        

    

    

    
    
    