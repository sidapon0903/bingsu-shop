import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRSh4qSslbt1nwmvGW1QC4NISFCqbZLaQ",
  authDomain: "bingsu-shop.firebaseapp.com",
  projectId: "bingsu-shop",
  storageBucket: "bingsu-shop.appspot.com",
  messagingSenderId: "53191930786",
  appId: "1:53191930786:web:fbbd7be144211fb56a38fb",
  measurementId: "G-PJQRSLGFB3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);