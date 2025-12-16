import { useState, useEffect, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, provider } from '../../lib/firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as UserData } from '@/features/users/types';

import { ROUTES } from '../routes';
import logo from '/logo-spaced.svg';
import Button from '../../components/buttons/Button';
import { db } from '../../lib/firebase/firestore';
import toast from 'react-hot-toast';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [auth]);

  const handleGoogleClicked = async (e: MouseEvent) => {
    try {
      const result = await signInWithPopup(auth, provider);
      debugger;

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userData = result.user;
      const idP = getAdditionalUserInfo(result);

      const user: UserData = {
        username: userData.displayName!,
        email: userData.email!,
        photoUrl: userData.photoURL!,
      };

      const userDoc = doc(db, 'users', userData.uid);
      const userSnap = await getDoc(userDoc);
      if (!userSnap.exists()) {
        await setDoc(userDoc, user);
      }

      // console.log('token: ', token);
      // console.log('user: ', userData);
      // console.log('idP: ', idP);

      if (userData.uid === 'NgjgtqXPihQSLQfhb2Slc8POVkm1' || import.meta.env.VITE_USE_EMULATORS === 'true') {
        navigate(ROUTES.APP);
      }
    } catch (err: any) {
      const error = err as Error;
      if (err.code === 'auth/cancelled-popup-request') return;
      if (err.code === 'permission-denied') {
        toast.error(err.code);
      }

      throw err;
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => new Error(error));
  };

  console.log(user);

  return (
    <div className="bg-olive font-outfit text-cream flex h-dvh flex-col items-center justify-center border border-black">
      <div className="flex-rows flex items-center">
        <img src={logo} className="h-8" />
        <p className="font-outfit text-lg">Keepin' Tabs</p>
      </div>
      {!user ? (
        <Button onClick={handleGoogleClicked}>Sign in with Google</Button>
      ) : (
        <>
          <p>{user.displayName}</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      )}
    </div>
  );
}

export default Home;
