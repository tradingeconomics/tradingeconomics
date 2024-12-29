import axios from "axios"
import db from '../../lib/firestore';
import { collection, getDocs } from "firebase/firestore"

export default async (req, res) => {
	try {
		const snapshot = await getDocs(
			collection(db, "stocks")
		)

		const stocks = snapshot.docs.map((doc) => ({
		    // * assign id property to each post (from Firestore document id)
		    id: doc.id,
		    ...doc.data(),
		}))

		// console.log("Query", stocks)
		res.status(200).json({ stocks })

	} catch (err){
		console.log("ERR", err)
		res.status(400).json({ err })
	}
}