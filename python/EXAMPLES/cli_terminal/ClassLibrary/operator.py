import tradingeconomics as te
import time
import ClassLibrary as cl

# from .comtrade import Comtrade



class Operator:
    
    

    def __init__(self,key):

        def selectSection(self):
            main_menu_dictionary={
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
            print( '************** Trading Economics - MAIN MENU -  **************')
            for x,y in main_menu_dictionary.items():
                print (x,y)
            selected_session = input('Choose a Section Number:')
            print('you have selected ' + selected_session)

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



            return selected_session

        self.key = key
        print(te.login(self.key))
        print('operator started')
        selected_session = True
        while selected_session:
            selected_session= selectSection(self)
            
           

        
        

    

    

    
    
    