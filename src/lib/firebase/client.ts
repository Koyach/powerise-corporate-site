// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEXMdkHI4H_X4UppSPMoMoHRFskTjNBuo",
  authDomain: "powerise-corporate-site.firebaseapp.com",
  projectId: "powerise-corporate-site",
  storageBucket: "powerise-corporate-site.firebasestorage.app",
  messagingSenderId: "498840732877",
  appId: "1:498840732877:web:9183767c8544d4ee021584",
  measurementId: "G-KWDV05XV77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only on client side)
export const analytics = typeof window !== 'undefined' && isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app;
