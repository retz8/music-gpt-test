import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // your config
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig); // possibly we already have an app initialized
const db = getFirestore(app); // get firestore databased

export { db };
