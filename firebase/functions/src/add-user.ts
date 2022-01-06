import * as functions from "firebase-functions";
import { v4 as uuid } from 'uuid';
import { getFirestore } from 'firebase-admin/firestore';
import { handleError } from "./helpers";
import * as joi from 'joi';
import * as cors from 'cors';

const requestSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  balance: joi.number().positive().required()
});

const handleRequest = async (request: functions.https.Request, response: functions.Response) => {
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
};

export const addUser = functions.https.onRequest((request, response) => {
  return cors()(request, response, async () => {
    await handleRequest(request, response);
  });
});
