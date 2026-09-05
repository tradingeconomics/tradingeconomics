const { schedule } = require("@netlify/functions")
const { axios } = require("axios")

module.exports.handler = schedule('0 0 * * *', async (event) => {
	let today = new Date().toLocaleDateString()
	try {
		let stocks = await axios.get(`/api/get_stocks`)
			.then(res => {return res.data.stocks})

		stocks = await Promise.all(
			stocks.map( async (stock) => {
		        if (stock.timestamp !== today){
					console.log("PULLING DATA FOR ", today, stock.timestamp)
					let updated_stock = await axios.get(`/api/companies?corps=${stock.symbol}`)
						.then(async(res) => {
							let fresh_stock = res.data.data[0]
							// console.log("Updated Stock", fresh_stock)

							let updated_stock = {
								'nation': this.state.selectedCountry,
								'timestamp': today,
								...fresh_stock
							}

							await axios.post(`/api/update_stock?id=${stock.id}`, updated_stock)
								.then(res => {
							  		console.log("Successfully updated stock ", res.data)
							  		console.log(updated_stock)
								})

							return updated_stock    
						})
					return updated_stock
		        } else {
		          // Update Stock in Database
		          return stock
		        }
	   		})
		)

	    return {
	    	statusCode: 200,
	    	stocks: stocks,
	    	message: "Successfully Updated Stocks"
	    }
	} catch(err){
		return {
          statusCode: 400,
          err: err,
          message: "Error Updating Stocks"
        }
	}
})