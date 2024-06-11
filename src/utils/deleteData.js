import { getFirestore, deleteDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";

const db = getFirestore(app);

async function deleteData(nameCollection, documentId) {
  await deleteDoc(doc(db, nameCollection, documentId));
}

export default deleteData;
