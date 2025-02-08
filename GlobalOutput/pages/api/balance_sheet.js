import axios from "axios"

export default async (req, res) => {
	let {query, method} = req
	let corps = query.corps
	// let corps = "AAPL"
	await axios
		.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${corps}?period=annual&apikey=C0nnV4DbDeE3f8x224xsSgP6glPZz5tN`)
		.then(data => {
			console.log(data)
			res.status(200).json({
				message: "Success",
				data: data.data
			})
		})
		.catch( error => {
			res.status(400).json({
				message: "Failed",
				error: error
			})
		})
}