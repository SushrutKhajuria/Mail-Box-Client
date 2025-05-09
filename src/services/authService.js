// src/services/authService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Format email safely for Firebase DB key
export const formatEmail = (email) => {
  return email.replace(/[@.]/g, "_");
};

// Signup function that uses Firebase Auth
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
