import { KeyboardEvent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { atom } from 'jotai';

import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/sidebar/Sidebar';
import Debug from '../components/Debug';
import { db } from '../firebase/firestore';

export const dataFetchedAtom = atom(false);

function App() {
  const [showDebug, setShowDebug] = useState(false);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '`') {
      setShowDebug(!showDebug);
    }
  };

  return (
    <ProtectedRoute>
      <div
        className="bg-olive text-cream flex min-h-dvh w-full justify-end overflow-x-hidden overflow-y-auto"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Debug showDebug={showDebug} />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}

export default App;
