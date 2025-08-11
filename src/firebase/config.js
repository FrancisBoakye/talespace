import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBadeNlaou_36OBB6vu2UQSvucg0qY7o4w",
  authDomain: "talespace-5e79b.firebaseapp.com",
  projectId: "talespace-5e79b",
  storageBucket: "talespace-5e79b.firebasestorage.app",
  messagingSenderId: "95498353568",
  appId: "1:95498353568:web:6b1c1c430d0757b0f602c5",
  measurementId: "G-B0N7XJYHM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

export default app;
