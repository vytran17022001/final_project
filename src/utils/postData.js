import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { postStripe } from "./apiStripe";

const db = getFirestore(app);
async function postData(nameCollection, data) {
  let id = uuidv4();

  if (nameCollection === "movie") {
    const resProduct = await postStripe("products", {
      name: data.movie_name,
      images: [data.movie_img],
    });
    if (!resProduct) throw new Error("Error posting data to Stripe");
    id = resProduct.id;

    const resPrice = await postStripe("prices", {
      unit_amount: data.movie_price,
      currency: "vnd",
      product: id,
    });
    if (!resPrice) throw new Error("Error posting data to Stripe");
    data.stripe_price_id = resPrice.id;
  }

  await setDoc(doc(db, nameCollection, id), data);
}

export default postData;
