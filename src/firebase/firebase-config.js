import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDEXuBHF54aRQfVElKSlS9ukJnl4VMUklY",
  authDomain: "monkey-blogging-36d5e.firebaseapp.com",
  projectId: "monkey-blogging-36d5e",
  storageBucket: "monkey-blogging-36d5e.appspot.com",
  messagingSenderId: "1079205058912",
  appId: "1:1079205058912:web:5187356ede870a1d106605",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
