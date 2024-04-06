from setuptools import setup, find_packages

setup(
  name = 'tradingeconomics task',
  packages = find_packages(exclude=['tests*']),  
  version = '0.0.1',
  description = 'Trading Economics API',
 
  author = 'Emanuel Abiyo',
  author_email = 'emanuel@websky.dk',
  license = 'MIT',
  url = 'https://github.com/emabistar/tradingeconomics/tree/master/python', 
  
  keywords = ['tradingeconomics', 'data'], 
 
               
  install_requires = ['pandas', 'tradingeconomics','flask','matplotlib','Flask-Executor'],
)