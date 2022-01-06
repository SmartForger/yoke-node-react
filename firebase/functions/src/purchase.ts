import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { v4 as uuid } from 'uuid';

import { Receipt } from "./types/Receipt";
import { Product } from "./types/Product";
import { getUserFromDb, handleError } from "./helpers";
import cors from "./helpers/cors";

const handleRequest = async (request: functions.https.Request, response: functions.Response) => {
  try {
    const db = getFirestore();
    const { productId, userId, quantity } = request.body;

    if (!userId) {
      throw {
        status: 400,
        message: 'userId is required',
      };
    }
    if (!productId) {
      throw {
        status: 400,
        message: 'productId is required',
      };
    }

    const qNum = parseInt(quantity, 10);
    if (isNaN(qNum) || qNum < 1) {
      throw {
        status: 400,
        message: 'quantity is invalid',
      };
    }

    const user = await getUserFromDb(db, userId);

    const productSnapshot = await db.collection('products').doc(productId).get();
    const product = productSnapshot.data() as Product;

    if (!product) {
      throw {
        status: 404,
        message: 'Product does not exist',
      };
    }

    if (user.balance < product.price) {
      throw {
        status: 400,
        message: 'User doesn not have enough balance',
      };
    }

    if (product.quantiyInStock < qNum) {
      throw {
        status: 400,
        message: 'Product does not have enough amount in stock',
      };
    }

    user.balance -= product.price;
    await db.collection('users').doc(user.id).set(user);

    product.quantiyInStock -= qNum;
    await db.collection('products').doc(product.id).set(product);

    const receipt: Receipt = {
      id: uuid(),
      productId,
      userId,
      productName: product.name,
      price: product.price,
      quantity: qNum,
      purchasedAt: new Date(),
    };

    await db.collection('receipts').doc(receipt.id).set({
      ...receipt,
      purchasedAt: new Date().toISOString(),
    });

    response.json(receipt);
  } catch (err) {
    handleError(response, err);
  }
}


export const purchase = cors(handleRequest);
