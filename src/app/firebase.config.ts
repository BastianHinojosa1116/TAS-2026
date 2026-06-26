import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBglqjEVcNBBcUVm0_twsZPVUjUoYBMzP8",
  authDomain: "dondevamos-c7465.firebaseapp.com",
  projectId: "dondevamos-c7465",
  storageBucket: "dondevamos-c7465.firebasestorage.app",
  messagingSenderId: "728150997550",
  appId: "1:728150997550:web:05f321dfd65b1e7cc63dbf",
  measurementId: "G-XZEG278HGX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);