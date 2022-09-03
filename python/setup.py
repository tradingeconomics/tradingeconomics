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
  version = '0.2.998',
  description = 'Library to download data from Trading Economics API',
  long_description =readme(),
  long_description_content_type='text/x-rst',
  author = 'Trading Economics',
  author_email = 'olexandr.baturin@tradingeconomics.com',
  license = 'MIT',
  url = 'https://github.com/ieconomics/open-api', 
  download_url = 'https://github.com/ieconomics/open-api/raw/master/python/dist/tradingeconomics-0.2.998.zip',
  keywords = ['tradingeconomics', 'data'], 
  classifiers = [ 'Programming Language :: Python :: 3',
                'Programming Language :: Python :: 3.2',
                'Programming Language :: Python :: 3.3',
                'Programming Language :: Python :: 3.4',
                'Programming Language :: Python :: 3.8'],
  install_requires = ['pandas', 'websocket-client'],
)
