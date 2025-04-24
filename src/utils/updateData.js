import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { app } from "../config/firebase";
import { updateStripe, postStripe } from "./apiStripe";

const db = getFirestore(app);

async function updateData(nameCollection, id, data) {
  if (!id) throw new Error("id is required");

  if (nameCollection === "movie") {
    // Update product first
    const resProduct = await updateStripe(`products`, id, {
      name: data.movie_name,
      images: [data.movie_img],
    });

    if (!resProduct) throw new Error("Error updating product in Stripe");

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

export default updateData;
