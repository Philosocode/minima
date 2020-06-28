import * as firebase from "firebase/app";
import "firebase/firestore";

import { DbCollectionType, IVideoDocument } from "shared/interfaces/firebase.interfaces";
import { ILikeState } from "redux/like";

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

/* REGULAR DOCS */
export function getDocFromDb(collection: DbCollectionType, documentId: string) {
  return db.collection(collection).doc(documentId).get()
    .then(doc => {
      if (doc.exists) return doc.data();
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

/* LIKES */
export function getLikes(likeType: DbCollectionType) {
  return db.collection("likes").doc(likeType).get()
    .then(doc => {
      if (doc.exists) return doc.data();
    })
    .catch(err => { throw new Error(err); });
}

export async function getAllLikes() {
  const snapshot = await db.collection("likes").get();

  const allLikes: any = {};
  
  snapshot.docs.forEach(doc => {
    allLikes[doc.id] = doc.data().likes
  });

  return allLikes as ILikeState;
}

export function isLiked(likeType: DbCollectionType, likeId: string) {
  return db.collection("likes").where(likeType, "==", likeId).get()
    .then(doc => {
      if (doc.empty) return false;
      return true;
    })
    .catch(err => { throw new Error(err) });
}

export function addLikeToDb(likeType: DbCollectionType, likeId: string) {
  return db.collection("likes").doc(likeType).update({
    [likeType]: firebase.firestore.FieldValue.arrayUnion(likeId)
  })
  .catch(err => { throw new Error(err) });
}

export function removeLikeFromDb(likeType: DbCollectionType, likeId: string) {
  return db.collection("likes").doc(likeType).update({
    [likeType]: firebase.firestore.FieldValue.arrayRemove(likeId)
  })
  .catch(err => { throw new Error(err) });
}