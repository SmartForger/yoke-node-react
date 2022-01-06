import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { getUserFromDb, handleError } from "./helpers";
import * as joi from 'joi';

const requestSchema = joi.object({
  id: joi.string().required(),
  name: joi.string(),
  email: joi.string(),
  balance: joi.number().positive(),
});


export const updateUser = functions.https.onRequest(async (request, response) => {
  try {
    const userObj = await requestSchema.validateAsync(request.body);

    const db = getFirestore();

    const user = await getUserFromDb(db, userObj.id);

    await db.collection('users').doc(userObj.id).set({
      ...user,
      ...userObj,
    });

    response.json({
      ...user,
      ...userObj,
    });
  } catch (err) {
    handleError(response, err);
  }
});
