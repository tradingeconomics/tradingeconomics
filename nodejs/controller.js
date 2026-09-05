const axios = require("axios")
require("dotenv").config()

const getAvailableCountries = async(req, res) =>{
    try {
        const api_key = process.env.API_KEY
        const response = await axios.get(`https://api.tradingeconomics.com/country?c=${api_key}`)
        res.status(200).json(response.data)        
    } catch (error) {
        res.status(500).json(error.message)
    }        
}

const compareCountries = async (req, res) =>{
    try {
        const {firstCountry, secondCountry } = req.query
        const api_key = process.env.API_KEY
        // Data for the first country
        const firstCountryResponse = await axios.get(`https://api.tradingeconomics.com/country/${firstCountry}?c=${api_key}`)

        const firstCountryData = firstCountryResponse.data
        const firstCountryCategories = []
        firstCountryData.forEach(element => {
            if(element.Category === "GDP" ||
                element.Category === "Core Inflation Rate" ||
                element.Category === "Employment Rate" ||
                element.Category === "Unemployment Rate"
            ){
                firstCountryCategories.push(element)
            }
        });

        const secondCountryResponse = await axios.get(`https://api.tradingeconomics.com/country/${secondCountry}?c=${api_key}`)

        const secondCountryData = secondCountryResponse.data
        const secondCountryCategories = []
        secondCountryData.forEach(element => {
            if(
                element.Category === "GDP" ||
                element.Category === "Core Inflation Rate" ||
                element.Category === "Employment Rate" ||
                element.Category === "Unemployment Rate"
            ){
                secondCountryCategories.push(element)
            }
        });        
        res.status(200).json({firstCountryCategories,secondCountryCategories})        
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getAvailableCountries, compareCountries}