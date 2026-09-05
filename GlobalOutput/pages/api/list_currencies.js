
import axios from "axios"

export default async (req, res) => {
	await axios
		.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`)
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
					message: "Fail to pull data from exchangeratesapi"
				})
			}
		})

}

// https://api.exchangeratesapi.io/v1/symbols?access_key=bc92112e343dfe65fdb46826e78df43b