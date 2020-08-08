import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { DbCollectionType, DbLikeType, IUser } from "shared/interfaces/firebase.interfaces";
import { IVideoBase, IChannelBase, IChannel, IPlaylistBase } from "shared/interfaces/youtube.interfaces";
import { store } from "redux/store";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
  
firebase.initializeApp(config);

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

export default firebase;
const db = firebase.firestore();
const auth = firebase.auth();

/* ======== */
// AUTH
/* ======== */
export async function login(email: string, password: string) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  }
  catch (err) {
    throw new Error("Invalid username or password.");
  }
}

export async function logout() {
  try {
    await auth.signOut();
  }
  catch (err) {
    throw new Error("Error signing out.");
  }
}

/* ============ */
// REGULAR DOCS
/* ============ */
export async function getDocFromDb(collection: DbCollectionType, documentId: string) {
  return db.collection(collection).doc(documentId).get()
    .then(doc => {
      if (doc.exists) return { ...doc.data(), id: doc.id };
    })
    .catch(err => alert("Error getting doc from DB: " + err));
}

export async function getDocsFromDb(collection: DbCollectionType, documentIds: string[]) {
  // FROM: https://medium.com/@cambaughn/firestore-use-promise-all-instead-of-getall-on-the-web-301f4678bd05
  const docRefs = documentIds.map(id => db.collection(collection).doc(id).get());

  return Promise.all(docRefs)
    .then(docs => docs.map(doc => ({...doc.data(), id: doc.id })))
    .catch(err => console.log(err));
}

export async function getChannelFromDbWithUsername(username: string): Promise<IChannel | undefined> {
  const snapshot = await db.collection("channels").where("snippet.customUrl", "==", username.toLowerCase()).get();

  if (snapshot.docs.length === 1) {
    const channelData = snapshot.docs[0].data() as IChannelBase;
    const { contentDetails, snippet, statistics } = channelData;

    return {
      id: snapshot.docs[0].id,
      contentDetails,
      snippet,
      statistics,
    }
  }
}

export async function addDocToDb(
  collection: DbCollectionType,
  documentId: string,
  document: IChannelBase | IPlaylistBase | IVideoBase | IUser
) {
  const docToAdd = Object.assign({}, document, { lastUpdatedMs: Date.now() });

  return db.collection(collection).doc(documentId).set(docToAdd)
    .catch(err => alert("Error updating DB: " + err));
}

/* ======== */
// LIKES
/* ======== */
export async function getLikes(likeType: DbLikeType, userId: string) {
  try {
    const userData = await getUserData(userId);
    return userData.likes[likeType];
  }
  catch (err) {
    throw new Error(err);
  }
}

export async function getUserData(userId: string) {
  try {
    const userDoc = await db.collection("users").doc(userId).get();

    if (userDoc.exists) return userDoc.data() as IUser;

    return await initNewUser(userId);
  }
  catch (err) {
    throw new Error(err);
  }
}

async function initNewUser(userId: string) {
  try {
    const newUserData: IUser = {
      likes: {
        channels: [],
        music: [],
        playlists: [],
        videos: []
      }
    };
    await addDocToDb("users", userId, newUserData);
    return newUserData;
  }
  catch (err) {
    throw new Error("Failed to initiate user data");
  }
}

export async function addLikeToDb(likeType: DbLikeType, likeId: string, userId: string) {
  const nestedField = "likes." + likeType;
  return db.collection("users").doc(userId).update({
    [nestedField]: firebase.firestore.FieldValue.arrayUnion(likeId)
  })
  .catch(err => { throw new Error(err) });
}

export async function removeLikeFromDb(likeType: DbLikeType, likeId: string, userId: string) {
  const nestedField = "likes." + likeType;
  return db.collection("users").doc(userId).update({
    [nestedField]: firebase.firestore.FieldValue.arrayRemove(likeId)
  })
  .catch(err => { throw new Error(err) });
}