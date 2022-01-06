import * as functions from "firebase-functions";
import * as cors from 'cors';

type Handler = (request: functions.https.Request, response: functions.Response) => Promise<void>;

export default (handler: Handler) => functions.https.onRequest((request, response) => {
  return cors()(request, response, async () => {
    await handler(request, response);
  });
})
