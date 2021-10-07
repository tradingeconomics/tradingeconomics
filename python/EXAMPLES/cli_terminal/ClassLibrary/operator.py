import tradingeconomics as te
import time
import ClassLibrary as cl

# from .comtrade import Comtrade



class Operator:
    
    

    def __init__(self,key):

        def selectSection(self):
            print( '************** Trading Economics - MAIN MENU -  **************')
            print('(1) - Comtrade \n(2) - Economic Calendar \n(3) - EuroStat \n(4) - Federal Reserve \n(5) - Indicators \n(6) - Markets \n(7) - News \n(8) - Search \n(9) - World Bank \n(10) - EXIT' )
            selected_session = input('Choose a Section Number:')
            print('you have selected ' + selected_session)

            if selected_session == '10':
                return False    

            if selected_session == '1':
                return cl.Comtrade(self.key)

            if selected_session == '2':
                return cl.EconomicCalendar(self.key)

            return selected_session

        self.key = key
        print(te.login(self.key))
        print('operator started')
        selected_session = True
        while selected_session:
            selected_session= selectSection(self)
            
           

        
        

    

    

    
    
    