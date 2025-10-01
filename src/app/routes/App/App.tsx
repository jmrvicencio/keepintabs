import { KeyboardEvent, useState, memo, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

import { showSidebarAtom } from '../../../components/sidebar/Sidebar';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Header from '../../../components/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Debug from '../../../components/Debug';
import FAB from '../../../components/FAB';
import { Plus } from 'lucide-react';
import { MainContentRefAtom } from '../../../store/mainArea';
import { ROUTES } from '../../routes';

export const dataFetchedAtom = atom(false);

function App() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [_, setMainContentRef] = useAtom(MainContentRefAtom);
  const [showDebug, setShowDebug] = useState(false);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const location = useLocation();
  const PlusMemo = memo(() => <Plus />);
  const showFab = location.pathname != ROUTES.NEW_GROUP;

  useEffect(() => {
    setMainContentRef(mainContentRef);
  }, []);

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '`') {
      setShowDebug(!showDebug);
    }
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 h-full bg-[#2F231D]/80"></div>
  ));

  return (
    <ProtectedRoute>
      <div
        className="bg-wheat-200 text-ink-800 font-outfit relative z-0 flex h-dvh w-full justify-end overflow-x-hidden overflow-y-auto"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Debug showDebug={showDebug} />
        <div className={`${showSidebar && 'sidebar'} relative h-full min-w-full`}>
          {showSidebar && <Overlay />}
          <div
            ref={mainContentRef}
            className={`${showSidebar && 'sidebar'} relative flex h-full w-full flex-col overflow-y-auto [.sidebar]:overflow-y-hidden`}
          >
            <div className="absolute inset-0 z-[-1] bg-[url(/bg/bg_pattern.png)] select-none" />
            <div className="absolute top-0 right-0 z-[-1] aspect-square h-50 bg-[url(/bg/bg_top.svg)] bg-contain bg-top-right bg-no-repeat" />
            <Header />
            <Outlet />
          </div>
          {showFab && (
            <FAB>
              <PlusMemo />
              Add Transaction
            </FAB>
          )}
        </div>
        <Sidebar />
        {/* <div className="fixed bottom-0 left-0 z-[-1] aspect-square h-50 bg-[url(/bg/bg_bottom.svg)] bg-contain bg-bottom-left bg-no-repeat" /> */}
      </div>
    </ProtectedRoute>
  );
}

export default App;
