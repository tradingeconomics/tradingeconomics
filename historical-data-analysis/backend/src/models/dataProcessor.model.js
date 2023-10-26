const te = require('tradingeconomics');

const apiKey = '422315f8222d41f:9j13ewr8vwvhe1g';
te.login(apiKey);

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const processHistoricalData = async (options) => {
  const structuredData = {};

  const indicators = ['gdp growth rate', 'interest rate', 'inflation rate', 'unemployment rate', 'balance of trade'];
  const startDate = `${options.startYear}-01-01`;
  const endDate = `${new Date(startDate).getFullYear() + 1}-01-01`

  try {
    const data = await te.getHistoricalData(
        country = options.countries,
        indicator = indicators,
        start_date = startDate,
        end_date = endDate
    );

    data.forEach(item => {
      const { Country, Category, DateTime, Value } = item;
      const date = new Date(DateTime);
      const monthName = monthNames[date.getMonth()];

      if (!structuredData[Country]) {
        structuredData[Country] = {};
      }

      if (!structuredData[Country][Category]) {
        structuredData[Country][Category] = {
          date: [],
          value: [],
        };
      }

      structuredData[Country][Category].date.push(monthName);
      structuredData[Country][Category].value.push(Value);
    });

    return structuredData;
  } catch (error) {
    console.log('Data request failed: ' + error);
  }
};


module.exports = {
  processHistoricalData,
};
