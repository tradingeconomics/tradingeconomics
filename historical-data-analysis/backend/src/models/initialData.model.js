const { processHistoricalData } = require('./dataProcessor.model');

const countries = ['mexico', 'sweden'];
const startYear = 2010;

const initialData = async () => await processHistoricalData({
    countries: countries,
    startYear: startYear
  });


module.exports = {
    initialData
}