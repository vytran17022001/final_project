import { getFirestore, deleteDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";
import { deleteStripe, updateStripe } from "./apiStripe";

const db = getFirestore(app);

async function deleteData(nameCollection, documentId) {
  if (!documentId) throw new Error("documentId is required");
  if (!nameCollection) throw new Error("nameCollection is required");

  if (nameCollection === "movie") {
    await updateStripe(`products`, documentId, {
      active: false,
    });
  }
  await deleteDoc(doc(db, nameCollection, documentId));
}

export default deleteData;
