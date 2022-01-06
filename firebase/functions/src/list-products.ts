import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { Product } from "./types/Product";
import { handleError } from "./helpers";

export const listProducts = functions.https.onRequest(async (request, response) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('products').get();

    const products: Product[] = [];
    snapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });

    response.json(products);
  } catch (err) {
    handleError(response, err);
  }
});
