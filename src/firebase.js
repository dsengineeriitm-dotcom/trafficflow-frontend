import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBmrAuV1w1IjGSm777stOsEzMHQLMo6OFM",
  authDomain: "trafficflow-demo.firebaseapp.com",
  projectId: "trafficflow-demo",
  storageBucket: "trafficflow-demo.firebasestorage.app",
  messagingSenderId: "489507249298",
  appId: "1:489507249298:web:b12acc566f65ca00f2da4b",
  measurementId: "G-K4691BY6VC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
