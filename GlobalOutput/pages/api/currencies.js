import axios from "axios"

export default async (req, res) => {
  // let today = new Date()
  // let yesterday = new Date(today - 86400000); 
  // let year = yesterday.getFullYear()
  // let month = yesterday.getMonth() + 1
  // let date = yesterday.getDate()
  // let yesterdayString = `${year}-${month}-${date}`
  // console.log("YES", yesterdayString)
  // const url = `https://api.exchangeratesapi.io/v1/${yesterdayString}?access_key=bc92112e343dfe65fdb46826e78df43b&symbols=${currencyBasket}&format=1`

  const {query, method} = req
  let base = query.base
  // console.log("BASE CURRENCY", base)

  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLowerCase()}.json`
  await axios
    .get(url)
    .then(({ data }) => {
      let exchangeRate = data[base.toLowerCase()]
      // console.log(exchangeRate)
      res.status(200).json({ exchangeRate })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}
// https://latest.currency-api.pages.dev/v1/currencies/eur.json
// https://api.exchangeratesapi.io/v1/latest?access_key=bc92112e343dfe65fdb46826e78df43b&base=USD&symbols=GBP,JPY,EUR
// https://api.exchangeratesapi.io/v1/2024-12-01?access_key=bc92112e343dfe65fdb46826e78df43b&symbols=USD,AUD,CAD,PLN,MXN&format=1