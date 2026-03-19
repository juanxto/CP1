import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN_tHsX6IL6tBdU7BkwLCJni0ipjog_QM",
  authDomain: "app-notas-bd7c6.firebaseapp.com",
  projectId: "app-notas-bd7c6",
  storageBucket: "app-notas-bd7c6.firebasestorage.app",
  messagingSenderId: "928615420737",
  appId: "1:928615420737:web:f6482ac0bfa965e1b307c0",
  measurementId: "G-FJNNKFE53V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);