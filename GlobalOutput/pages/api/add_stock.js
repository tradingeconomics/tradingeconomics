import axios from "axios"
import db from "../../lib/firestore"
import { collection, addDoc } from "firebase/firestore"

export default async (req, res) => {
	try {
		let { query, method } = req
		let stocks = req.body

		stocks.map(async(stock) => {
			let today = new Date().toLocaleDateString()
			const docRef = await addDoc(
				collection(db, "stocks"), {
					'timestamp':today,
					...stock
				}
			);
			console.log("STOCK Added",docRef.id,today)
		})

		res.status(200).json({
			success: true, 
			stocks: stocks
		})
	} catch(err){
		res.status(400).json({err})
	}
}