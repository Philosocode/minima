import * as firebase from "firebase/app";
import "firebase/firestore";

import { DbCollectionType, IVideoDocument } from "shared/interfaces/firebase.interfaces";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "minima-client",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
  
firebase.initializeApp(config);
const db = firebase.firestore();

export function getDocFromDb(collection: DbCollectionType, documentId: string) {
  return db.collection(collection).doc(documentId).get()
    .then(doc => {
      if (doc.exists) return doc.data();
      else return null;
    })
    .catch(err => alert("Error getting doc from DB: " + err));
}

export function addDocToDb(
  collection: DbCollectionType,
  documentId: string,
  document: IVideoDocument
) {
  return db.collection(collection).doc(documentId).set(document)
    .catch(err => alert("Error updating DB: " + err));
}