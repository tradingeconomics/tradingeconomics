'use server'

const te = require('tradingeconomics')

const API_KEY = 'bdc47ca7d4134d0:s9ec8qqlsd8rp9t'

const IndicatorsExample = async () => {
  try {
    await te.login('bdc47ca7d4134d0:s9ec8qqlsd8rp9t');

    
    //Get a list of all countries
    const data = await te.getAllCountries()

    // Get a list of all indicators
    const data1 = await te.getIndicatorData()

    // Get an indicators list by country/countries, you can pass group to get more specific data
    const data2 = await te.getIndicatorData(country = ['sweden'])
    const data3 = await te.getIndicatorData(country = 'mexico', group = 'gdp')

    // Get specific indicator for all countries
    const data4 = await te.getIndicatorData(indicator = 'gdp')

    // Get a list of indicators by ticker
    const data5 = await te.getIndicatorData(ticker = 'usurtot')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};


export const getIndicatorsForCountry = async (country) => {
  try {
    await te.login(API_KEY);

    

    // Get an indicators list by country/countries, you can pass group to get more specific data
    const data = await te.getIndicatorData(country = [`${country}`])



    console.log('ffffffffffffffffffffffffffffff', data); 
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const getAllCountries = async () => {
  try {
    console.log('geting here')
    await te.login('bdc47ca7d4134d0:s9ec8qqlsd8rp9t');

    
    const data = await te.getAllCountries()

    return data    
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};


IndicatorsExample();
