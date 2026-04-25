import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const{getReactNativePersistence} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAyRN9N0QXRY-nV0GrCZTTW0YYOxkPCJ5A",
  authDomain: "cp05-366fb.firebaseapp.com",
  projectId: "cp05-366fb",
  storageBucket: "cp05-366fb.firebasestorage.app",
  messagingSenderId: "227751411035",
  appId: "1:227751411035:web:025f65c5dc514fd2ffae7e",
  measurementId: "G-N62PD0CY0Y"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


const db = getFirestore(app);
export {db}
