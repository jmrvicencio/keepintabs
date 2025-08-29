import { KeyboardEvent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { atom } from 'jotai';

import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/sidebar/Sidebar';
import { db } from '../firebase/firestore';

export const dataFetchedAtom = atom(false);

function App() {
  const [showDebug, setShowDebug] = useState(false);
  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
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
        {showDebug && <div className="bg-accent-200/60 absolute top-2 right-2 z-1 p-4">debug</div>}
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}

export default App;
