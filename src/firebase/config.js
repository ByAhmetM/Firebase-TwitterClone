// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkK3y9kbU_rZRObk9zjPa_-A_l0MA8Eyg",
  authDomain: "ahmettwitter18.firebaseapp.com",
  projectId: "ahmettwitter18",
  storageBucket: "ahmettwitter18.appspot.com",
  messagingSenderId: "938265596746",
  appId: "1:938265596746:web:af83191f0c5e40a33ae7b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
