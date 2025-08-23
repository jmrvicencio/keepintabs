import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBnGo_24Jxg7ysLfYARBJA00RdU9QZ7kDU',
  authDomain: 'keepin-tabs-e8b52.firebaseapp.com',
  projectId: 'keepin-tabs-e8b52',
  storageBucket: 'keepin-tabs-e8b52.firebasestorage.app',
  messagingSenderId: '51223801827',
  appId: '1:51223801827:web:d74b57868d27780d387ad6',
  measurementId: 'G-XG26QXSSQC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
