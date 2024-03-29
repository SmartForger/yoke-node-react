import * as functions from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { Receipt } from "./types/Receipt";
import { getUserFromDb, handleError } from "./helpers";
import cors from './helpers/cors';

const handleRequest = async (request: functions.https.Request, response: functions.Response) => {
  try {
    const db = getFirestore();
    const { id } = request.query;

    if (!id) {
      throw {
        status: 400,
        message: 'id is required'
      };
    }

    const user = await getUserFromDb(db, id as string);

    const receiptsSnapshot = await db.collection('receipts').where('userId', '==', id).get();

    const receipts: Receipt[] = [];
    receiptsSnapshot.forEach((doc) => {
      receipts.push(doc.data() as Receipt);
    });

    user.receipts = receipts;

    response.json(user);
  } catch (err) {
    handleError(response, err);
  }
}

export const getUser = cors(handleRequest);
