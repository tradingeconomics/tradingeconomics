import axios from "axios"

export default async (req, res) => {
	await axios
		.get(`https://api.tradingeconomics.com/comtrade/countries?c=blwvmxl5x1rk8qk:jodtirdtxtxvyld`)
		.then(response => {
			if (response.status == 200){
				res.status(200).json({
					success: true, 
					message: "Get the data", 
					data: response.data
				})
			} else {
				res.status(400).json({
					success: false, 
					message: "Fail to pull data from TradingEconomics API"
				})
			}
		})

}