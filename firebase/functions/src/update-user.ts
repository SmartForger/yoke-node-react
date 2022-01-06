import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { getUserFromDb, handleError } from "./helpers";

export const addUser = functions.https.onRequest(async (request, response) => {
  try {
    const { id } = request.body;

    if (!id) {
      throw {
        status: 400,
        message: 'id is required',
      };
    }

    const db = getFirestore();

    const user = await getUserFromDb(db, id);

    await db.collection('users').doc(id).set({
      ...user,
      ...request.body,
    });

    response.json({
      ...user,
      ...request.body,
    });
  } catch (err) {
    handleError(response, err);
  }
});
