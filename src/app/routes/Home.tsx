import { useState, useEffect, type MouseEvent } from 'react';
import { Routes, useNavigate } from 'react-router-dom';
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
import toast from 'react-hot-toast';
import router, { ROUTES } from '../routes';
import { db } from '../../lib/firebase/firestore';

import Button from '../../components/buttons/Button';
import logo from '/logo-spaced.svg';
import bg from '/home/pattern.svg';
import patternImg from '/home/pattern.png';
import sampleImg from '/home/sample.png';
import logoImg from '/home/logo.svg';
import PanelButton from '@/components/neubrutalist/PanelButton';

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

      if (import.meta.env.VITE_USE_EMULATORS === 'true') {
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

  const handleRedirect = () => {
    navigate(ROUTES.APP);
  };

  console.log(user);

  return (
    <div
      className="font-outfit text-charcoal-700 bg-accent-190 flex min-h-dvh flex-col items-center justify-center bg-center bg-repeat"
      style={{ backgroundImage: `url('${patternImg}')` }}
    >
      <div className="flex flex-row gap-12 px-8 py-12 md:py-0">
        <img src={sampleImg} className="hidden w-72 md:block" />
        <div className="flex h-full max-w-140 flex-col items-center justify-center text-left text-xl md:text-2xl">
          <div className="flex items-center gap-4">
            <img src={logoImg} className="w-10 md:w-17" />
            <h1 className="text-4xl font-extrabold md:text-7xl">Keepin' Tabs</h1>
          </div>

          <img src={sampleImg} className="mt-12 block w-50 md:hidden" />
          <p className="mt-8">
            Keepin’ Tabs is a simple, friendly web app that helps you track debts and payments when splitting the cost
            of dinners, coffee runs, movie nights, and more with friends, co‑workers, roommates, or anyone you share
            expenses with.
          </p>
          <p className="mt-8">
            It makes bill‑splitting easier than dusting off that old (but admittedly reliable) spreadsheet.
          </p>
          <div className="mt-12">
            {!user ? (
              <PanelButton onClick={handleGoogleClicked} bgColor="bg-accent-600" className="text-center text-white">
                Sign in with Google
              </PanelButton>
            ) : (
              // <Button onClick={handleGoogleClicked}>Sign in with Google</Button>
              <>
                <p>{user.displayName}</p>
                <PanelButton
                  onClick={handleRedirect}
                  bgColor="bg-accent-200"
                  className="text-charcoal-900 mt-2 cursor-pointer text-center"
                >
                  Go to App
                </PanelButton>
                <PanelButton
                  onClick={handleSignOut}
                  bgColor="bg-accent-600"
                  className="mt-2 cursor-pointer text-center text-white"
                >
                  Sign Out
                </PanelButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
