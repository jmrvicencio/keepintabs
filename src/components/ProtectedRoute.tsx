import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase/auth';
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { useState, useEffect, type ReactNode } from 'react';

import logo from '/logo-spaced-white.svg';
import Logo from './logo/Logo';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function awaitAuth() {
      await auth.authStateReady();

      setLoading(false);
      setUser(auth.currentUser);
    }

    awaitAuth();
  });

  useEffect(() => {
    if (!user) return;

    user.getIdTokenResult().then((result) => {
      if (!('admin' in result.claims && result.claims.admin == true)) {
        setUser(null);
        signOut(auth);
        navigate('/');
      }
    });
  }, [loading, user]);

  if (loading)
    return (
      <div className="bg-wheat-200 text-cream flex h-dvh w-dvw items-center justify-center bg-[url(/bg/bg_pattern.png)]">
        <Logo className="fill-wheat-400 h-20 animate-pulse" />
        {/* <img src={logo} className="w-16 animate-pulse" /> */}
      </div>
    );
  else
    return (import.meta.env.VITE_USE_EMULATORS === 'true' && user) ||
      (user && user.uid === 'NgjgtqXPihQSLQfhb2Slc8POVkm1') ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
}

export default ProtectedRoute;
