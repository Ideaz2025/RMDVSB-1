import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCfEUqAJB6DmWxs04e7KTtSzrVyuXAC76U",
  authDomain: "rmdvsb-74edd.firebaseapp.com",
  projectId: "rmdvsb-74edd",
  storageBucket: "rmdvsb.appspot.com",
  messagingSenderId: "131674498513",
  appId: "1:131674498513:web:b8e00fedbdfd240c486cf0",
  measurementId: "G-RNEBWKYEYS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };