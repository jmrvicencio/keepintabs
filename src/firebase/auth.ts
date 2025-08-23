import app from './app';
import { GoogleAuthProvider, getAuth, connectAuthEmulator } from 'firebase/auth';

export const auth = getAuth(app);
auth.languageCode = 'en';
// auth.useDeviceLanguage();

// Check to use emulators
console.log('use auth emulator: ', import.meta.env.VITE_USE_EMULATORS);
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  console.log('using auth emulator');
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export const provider = new GoogleAuthProvider();
