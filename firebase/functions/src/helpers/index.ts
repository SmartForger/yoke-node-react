import { Firestore } from 'firebase-admin/firestore';
import * as functions from "firebase-functions";
import { User } from '../types/User';

export const handleError = (res: functions.Response<any>, err: unknown) => {
  res.status((err as any).status || 500).send({
    message: (err as any).message || '',
  });
}

export const getUserFromDb = async (db: Firestore, id: string) => {
  try {
    const userSnapshot = await db.collection('users').doc(id).get();
    const user = userSnapshot.data() as User;

    if (!user) {
      throw {};
    }

    return user;
  } catch {
    throw {
      status: 404,
      message: 'User does not exist',
    };
  }
}

