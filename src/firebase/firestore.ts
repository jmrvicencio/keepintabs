import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import app from './app';

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    /*settings*/
    tabManager: persistentMultipleTabManager(),
  }),
});

if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  console.log('using firestore emulator');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
