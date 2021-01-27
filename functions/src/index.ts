import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

admin.initializeApp();

const { db = {} } = functions.config()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const matrices = functions.https.onRequest((req,res) => { })
// export const list = functions.https.onRequest((req,res) => {})
// export const create = functions.https.onRequest((req,res) => {})

const maximumObjectCount = db.maxRecordCount || 2000
export const truncate = functions.database.ref('/objects').onWrite((change) => {
  const parentRef = change.after.ref;
  const snapshot = change.after
  if (snapshot.numChildren() >= maximumObjectCount) {
    let i = 0;
    const updates: Record<string, null> = {}
    snapshot.forEach(child => {
      if (++i <= snapshot.numChildren() - maximumObjectCount) {
        updates[child.key] = null
      }
    })
    return parentRef.update(updates)
  }
  return null
})
