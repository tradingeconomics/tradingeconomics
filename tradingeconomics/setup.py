from distutils.core import setup

setup(
  name = 'tradingeconomics',
  packages = ['tradingeconomics'], 
  version = '...',
  description = 'Function to extract time series',
  author = 'Olexandr Baturin',
  author_email = 'olexandr.baturin@tradingeconomics.com',
  license='MIT',
  url = 'https://github.com/ieconomics/open-api', 
  download_url = '....', 
  keywords = ['tradingeconomics', 'upload', 'data'], 
  classifiers = [ 'Programming Language :: Python :: 2.7'],
  install_requires=['json', 'urllib', 'pandas', 'datetime' ],
)