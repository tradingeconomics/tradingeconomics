from setuptools import setup, find_packages

def readme():
    with open('README.rst') as f:
        return f.read()

setup(
  name = 'tradingeconomics',
  packages = find_packages(exclude=['tests*']),  
  version = 'v0.2.4',
  description = 'Library to download data from Trading Economics API',
  long_description = readme(),
  author = 'Trading Economics',
  author_email = 'olexandr.baturin@tradingeconomics.com',
  license = 'MIT',
  url = 'https://github.com/ieconomics/open-api', 
  download_url = 'https://github.com/ieconomics/open-api/archive/v0.2.4.tar.gz', 
  keywords = ['tradingeconomics', 'data'], 
  classifiers = [ 'Programming Language :: Python :: 2.7'],
  install_requires = ['pandas'],
)
