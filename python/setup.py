from setuptools import setup, find_packages
from os import path
import io

def readme():
    this_directory = path.abspath(path.dirname(__file__))
    with io.open(path.join(this_directory, 'README.rst'), encoding='utf-8') as f:
      return f.read()

setup(
  name = 'tradingeconomics',
  packages = find_packages(exclude=['tests*']),  
  version = '4.1',
  description = 'Trading Economics API',
  long_description =readme(),
  long_description_content_type='text/x-rst',
  author = 'Trading Economics',
  author_email = 'support@tradingeconomics.com',
  license = 'MIT',
  url = 'https://github.com/tradingeconomics/tradingeconomics/python', 
  download_url = 'https://github.com/tradingeconomics/tradingeconomics/raw/master/python/dist/tradingeconomics-4.1.zip',
  keywords = ['tradingeconomics', 'data'], 
  classifiers = [ 'Programming Language :: Python :: 3',
                'Programming Language :: Python :: 3.2',
                'Programming Language :: Python :: 3.3',
                'Programming Language :: Python :: 3.4',
                'Programming Language :: Python :: 3.8'],
  install_requires = ['pandas', 'websocket-client'],
)
