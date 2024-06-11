import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { app } from "../config/firebase";

const db = getFirestore(app);

async function getData(nameCollection) {
  const col = collection(db, nameCollection); // Tro vao collection
  const schoolSnapShot = await getDocs(col); // Lay du lieu trong collection
  const response = schoolSnapShot.docs.map((doc) => doc.data()); // Map du~ lieu thanh json
  return response; // Tra ve du lieu
}
export default getData;
/*
    Collection(StudentLop6)
    Collection Class:
    Collection Giao vien
    Collection Student: 
        - Student A (Document: HS01)
        - Student B (Document: HS02)

        Key - value

    student.documents('hs01') 

    Collection Role{
        name: 'student', (id - documentID: 123)
        name: 'teacher',id - documentID: 124)
        name: 'staff',id - documentID: 125)
    }

    Collection User{
        name'Thanh', role_id: 123
    }
*/
