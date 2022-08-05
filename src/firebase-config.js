// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pl-coupons.firebaseapp.com",
  projectId: "pl-coupons",
  storageBucket: "pl-coupons.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
