import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const{getReactNativePersistence} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyA4cNQXXm3tohPNvPguImsln2JVOkjJyOQ",
  authDomain: "projetofirebase-e4775.firebaseapp.com",
  projectId: "projetofirebase-e4775",
  storageBucket: "projetofirebase-e4775.firebasestorage.app",
  messagingSenderId: "20438496236",
  appId: "1:20438496236:web:d6ca6c88380243ca0346c9"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


const db = getFirestore(app);
export {db}