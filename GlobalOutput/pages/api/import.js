import axios from "axios"

export default async (req, res) => {
  let country = req.query.country;
  // const url = `https://comtrade.tradingeconomics.com/comtrade/?r=`+country+`&c=XX&t=2&treemap=categories&format=json`
  const url = `https://api.tradingeconomics.com/comtrade/import/${country}?c=blwvmxl5x1rk8qk:jodtirdtxtxvyld&treemap=categories&format=json`
  await axios
    .get(url)
    .then(({ data }) => {
      let products = data.sort(function(a,b){
        return b.value - a.value
      })
      res.status(200).json(products)
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}


// https://api.tradingeconomics.com/comtrade/countries?c=XX
// https://api.tradingeconomics.com/comtrade/import/india?c={api_key}