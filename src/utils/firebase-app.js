import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT7KJXDoSJ6O2ItWGe5E1UQ84L_RjG4eE",
  authDomain: "toktok-clone-780fb.firebaseapp.com",
  projectId: "toktok-clone-780fb",
  storageBucket: "toktok-clone-780fb.appspot.com",
  messagingSenderId: "608822161037",
  appId: "1:608822161037:web:74b2d2d4b2d66615667cc4",
  measurementId: "G-2MPYHXCSNE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
