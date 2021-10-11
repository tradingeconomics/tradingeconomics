

# from os import X_OK


 
# def person(name,**data):
#     dct ={}
#     # print(name)
#     for i,j in data.items():
#         dct[i]=j
        
#     for x, y in dct.items():
#         print (f'{x} -- {y}')



# person('tennessee', age=38, birth_city='manaus')



# selected_country = section.select('country','portugal')
# data_response=te.getCmtCountryByCategory(country = selected_country, type = 'export',  output_type = selected_output_type )


class MrRobot():
    
    def __init__(self,robot_name) -> None:
        self.name = robot_name
        
        def say_hello(self):
            print(f'Hello, my name is {self.name}')
        
        def say_hi(self):
            print(f'Hi, my name is {self.name}')
    
        def ask_name(self):
            user_name = input('What is your name?')

        def ask_age(self):
            pass

        say_hello(self)




    
mr_robot1 = MrRobot('Jack')
# mr_robot2 = MrRobot('Bill')



# dct_mr_robot ={
#     '1': mr_robot1,
#     '2': mr_robot2
# }


# for x,y in dct_mr_robot.items():
#     print(x,y.name)

# user_choise = input('choose your Robot: >>' )

# select_robot = dct_mr_robot[user_choise]





