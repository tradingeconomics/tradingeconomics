import { getFirestore } from "firebase/firestore";
import firebaseApp from './firebaseConfig';

const db = getFirestore(firebaseApp);
export default db;