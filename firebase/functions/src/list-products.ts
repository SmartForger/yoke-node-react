import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { Product } from "./types/Product";
import { handleError } from "./helpers";
import cors from './helpers/cors'

const handleRequest = async (request: functions.https.Request, response: functions.Response) => {
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
}

export const listProducts = cors(handleRequest);
