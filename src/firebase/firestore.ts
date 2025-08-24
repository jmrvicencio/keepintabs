import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const db = getFirestore();

if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  console.log('using firestore emulator');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
