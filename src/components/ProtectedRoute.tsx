import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/auth';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useState, useEffect, type ReactNode } from 'react';

import logo from '/logo-spaced-white.svg';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
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

  if (loading)
    return (
      <div className="bg-olive text-cream flex h-dvh w-dvw items-center justify-center">
        <img src={logo} className="w-16 animate-pulse" />
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
