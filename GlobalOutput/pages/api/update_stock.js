import axios from "axios"
import db from "../../lib/firestore"
import { collection, doc, updateDoc } from "firebase/firestore"

export default async (req, res) => {
	let stock = req.body
	let id = req.query.id

	try {
		await updateDoc(
			doc(db, "stocks", id),
			stock
		)
		res.status(200).json({
			success: true,
			message: `Updated stock ${id}`
		})
	} catch(err){
		console.log(err)
		res.status(400).json({err})
	}
}