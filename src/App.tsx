import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, provider } from './firebase/auth';

import logo from '/logo-spaced.svg';
import Button from './components/Button';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [auth]);

  const handleGoogleClicked = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      const idP = getAdditionalUserInfo(result);
      console.log('i am chekcing state');
      console.log('token: ', token);
      console.log('user: ', user);
      console.log('idP: ', idP);
      // navigate('/test');
    } catch (err: any) {
      if (err.code === 'auth/cancelled-popup-request') return;
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
    <div className="bg-olive font-outfit text-cream flex h-dvh flex-col items-center justify-center border-1 border-black">
      <div className="flex-rows flex items-center">
        <img src={logo} className="h-8" />
        <p className="font-outfit text-lg">Keepin' Tabs</p>
      </div>
      {!user ? (
        <Button handleClick={handleGoogleClicked}>Sign in with Google</Button>
      ) : (
        <>
          <p>{user.displayName}</p>
          <Button handleClick={handleSignOut}>Sign Out</Button>
        </>
      )}
    </div>
  );
}

export default App;
