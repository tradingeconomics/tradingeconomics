import axios from "axios"

export default async (req, res) => {
  const url = `https://api.tradingeconomics.com/markets/commodities?c=guest:guest&format=json`
  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}