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
      navigate('/test');
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
    <>
      {!user ? (
        <button onClick={handleGoogleClicked}>Sign in with Google</button>
      ) : (
        <>
          <p>{user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </>
  );
}

export default App;
