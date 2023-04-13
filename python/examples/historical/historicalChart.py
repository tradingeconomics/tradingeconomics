import matplotlib.pyplot as plt
import numpy as np
import tradingeconomics as te

#without a client key only a small sample of data will be given.
te.login('guest:guest')


#plot a simple chart
mydata = te.getHistoricalData(country = 'United states', indicator = 'Imports')

plt.title("United states - Imports")
plt.grid(True)
plt.ylabel("Indicator - Imports")
plt.xlabel("Historical")

plt.plot(mydata)
plt.show()
