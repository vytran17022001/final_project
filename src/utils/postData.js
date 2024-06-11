import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

async function postData(nameCollection, data) {
  // Student, Info
  await setDoc(doc(db, nameCollection, uuidv4()), data);
}

export default postData;
