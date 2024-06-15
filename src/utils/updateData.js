import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";

const db = getFirestore(app);

async function updateData(nameCollection, id, data) {
  if (!id) throw new Error("id is required");
  await setDoc(doc(db, nameCollection, id), data);
}

export default updateData;
