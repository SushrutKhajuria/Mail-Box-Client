// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwNd_Fb6kAY087uMTdkv3k5tVzc32ZcjI",
  authDomain: "mail-box-client-7fb43.firebaseapp.com",
  databaseURL:"https://mail-box-client-7fb43-default-rtdb.firebaseio.com/",
  projectId: "mail-box-client-7fb43",
  storageBucket: "mail-box-client-7fb43.appspot.com", 
  messagingSenderId: "892665004379",
  appId: "1:892665004379:web:f371272139b02f9932da7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
