import * as functions from "firebase-functions";
import { v4 as uuid } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { handleError } from "./helpers";

export const addUser = functions.https.onRequest(async (request, response) => {
  try {
    const db = getFirestore();

    const userId = uuid();

    await db.collection('users').doc(userId).set({
      id: userId,
    });

    response.json({
      id: userId
    });
  } catch (err) {
    handleError(response, err);
  }
});
