import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Analytics, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAEqK2T7f7S1ifIRLAyMdlbxQNN1we7rfI",
  authDomain: "todoapp-b88eb.firebaseapp.com",
  projectId: "todoapp-b88eb",
  storageBucket: "todoapp-b88eb.firebasestorage.app",
  messagingSenderId: "690664731349",
  appId: "1:690664731349:web:8c659316047ef87ae5685c",
  measurementId: "G-7RQMWL7C5R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Only initialize analytics in browser environment
export let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}