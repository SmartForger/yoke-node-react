import * as functions from "firebase-functions";
import { v4 as uuid } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { handleError } from "./helpers";
import * as joi from 'joi';

const requestSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  balance: joi.number().positive().required()
});

export const addUser = functions.https.onRequest(async (request, response) => {
  try {
    const userObj = await requestSchema.validateAsync(request.body);

    const db = getFirestore();

    const userId = uuid();

    await db.collection('users').doc(userId).set({
      id: userId,
      ...userObj,
    });

    response.json({
      id: userId,
      ...userObj,
    });
  } catch (err) {
    handleError(response, err);
  }
});
