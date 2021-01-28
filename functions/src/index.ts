import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const { db = {} } = functions.config();

const maximumObjectCount = db.maxRecordCount || 2000;
export const truncate = functions.database.ref("/objects").onWrite((change) => {
  const parentRef = change.after.ref;
  const snapshot = change.after;
  if (snapshot.numChildren() >= maximumObjectCount) {
    let i = 0;
    const updates: Record<string, null> = {};
    snapshot.forEach((child) => {
      if (++i <= snapshot.numChildren() - maximumObjectCount) {
        updates[child.key] = null;
      }
    });
    return parentRef.update(updates);
  }
  return null;
});
