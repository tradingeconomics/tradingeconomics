const express = require("express");
const path = require("path");
const te = require('tradingeconomics');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

te.login(`${process.env.TE_API_KEY}`) //trading economics login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get('/api/indicator', async (req, res) => {
  try {

    const countries = req.query.country
    const startDate = req.query.start_date
    const endDate = req.query.end_date

    let historicalData = await te.getHistoricalData(country = countries, indicator = ['gdp'], start_date = startDate, end_date = endDate)
    historicalData = historicalData.filter((data) => data.Frequency)

    let fulldata = {}

    for (let index = 0; index < historicalData.length; index++) {

      if (!fulldata[historicalData[index].Country]) {
        fulldata[historicalData[index].Country] = []
      } else {
        fulldata[historicalData[index].Country].push(historicalData[index])
      }
    }

    res.send({ fulldata })


  } catch (error) {

  }
})

app.get('/api/seriesCode', async (req, res) => {

  try {
    let stockMarket = await te.getMarketSnap(marketsField = 'index')
    stockMarket = stockMarket.filter((data) => data.Frequency)


    res.send({ stockMarket })


  } catch (error) {

  }

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
