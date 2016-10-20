from setuptools import setup, find_packages

def readme():
    with open('README.rst') as f:
        return f.read()

setup(
  name = 'tradingeconomics',
  packages = find_packages(exclude=['tests*']),  
  version = 'v0.1.604',
  description = 'Function to extract time series',
  long_description = readme(),
  author = 'Olexandr Baturin',
  author_email = 'olexandr.baturin@tradingeconomics.com',
  license = 'MIT',
  url = 'https://github.com/ieconomics/open-api', 
  download_url = 'https://github.com/ieconomics/open-api/archive/v0.1.4.tar.gz', 
  keywords = ['tradingeconomics', 'upload', 'data'], 
  classifiers = [ 'Programming Language :: Python :: 2.7'],
  install_requires = ['pandas'],
)