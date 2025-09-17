import { KeyboardEvent, useState, memo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

import { showSidebarAtom } from '../../../components/sidebar/Sidebar';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Header from '../../../components/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Debug from '../../../components/Debug';

export const dataFetchedAtom = atom(false);

function App() {
  const [showDebug, setShowDebug] = useState(false);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '`') {
      setShowDebug(!showDebug);
    }
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="absolute inset-0 z-2 bg-black/60"></div>
  ));

  return (
    <ProtectedRoute>
      <div
        className="bg-wheat-200 text-ink-800 flex min-h-dvh w-full justify-end overflow-x-hidden overflow-y-auto"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Debug showDebug={showDebug} />
        <div className="relative flex min-h-dvh min-w-full flex-col">
          {showSidebar && <Overlay />}
          <Header />
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </ProtectedRoute>
  );
}

export default App;
