// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC36qz9p-SkNLcMEMcFo9hY3K_Dxn3aNM0",
    authDomain: "medimatch-25165.firebaseapp.com",
    projectId: "medimatch-25165",
    storageBucket: "medimatch-25165.firebasestorage.app",
    messagingSenderId: "54958324582",
    appId: "1:54958324582:web:6132e2865018fe6b1ee6a7",
    measurementId: "G-L9MV0KHWVL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;