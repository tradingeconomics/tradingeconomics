import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tradingeconomics as te
te.login('guest:guest')

#without a client key only a small sample of data will be given.

#getting data to plot a bar chart
mydata = te.fetchMarkets(symbol = 'aapl:us')
 
y_pos = np.arange(len(list(mydata)))

#Values from the Open, High, Low, Close got from fetchMarkets(symbol = 'aapl:us', for 2017-01-03 ) 
performance = [0,1158000,1163300,1147600,1161500]

plt.bar(y_pos, performance, align='center', alpha=0.3)
plt.xticks(y_pos, mydata)
plt.xlabel('AAPL:US - 2017-01-03 ')
plt.title('Historical Markets')
plt.grid(True)
plt.show()


