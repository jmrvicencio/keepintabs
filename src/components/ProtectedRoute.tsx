import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/auth';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useState, useEffect } from 'react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return <>{console.log('i am now loading')}</>;
  else
    return (import.meta.env.VITE_USE_EMULATORS === 'true' && user) ||
      (user && user.uid === 'NgjgtqXPihQSLQfhb2Slc8POVkm1') ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
}

export default ProtectedRoute;
