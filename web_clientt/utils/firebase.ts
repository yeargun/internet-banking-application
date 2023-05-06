// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHkEuXm6Bv9qAtLdmxaDq_r6CsC06sw0A",
  authDomain: "stufimg.firebaseapp.com",
  projectId: "stufimg",
  storageBucket: "stufimg.appspot.com",
  messagingSenderId: "964568938274",
  appId: "1:964568938274:web:bd5646a8d1165853df977b",
  measurementId: "G-KPYJKCB2WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
export const storage = getStorage(app);
