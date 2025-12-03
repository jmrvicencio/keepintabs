import { KeyboardEvent, useState, memo, useEffect, useRef, type MouseEvent, UIEvent } from 'react';
import { Outlet, useLocation, useNavigate, useParams, Link, Routes } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { ROUTES } from '../../routes';

import { Plus } from 'lucide-react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Header from '../../../components/Header';
import Sidebar from '../../../components/sidebar/Sidebar';
import Debug from '../../../components/Debug';
import PopupOverlay from '../../../features/popup-menu/components/PopupOverlay';
import FAB from '../../../components/FAB';

import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { MainContentRefAtom } from '../../../store/mainArea';
import { showSidebarAtom } from '../../../components/sidebar/Sidebar';
import useFab from '@/features/fab/hooks/useFab';

export const dataFetchedAtom = atom(false);

function App() {
  // Call Hooks

  const { showPopup } = usePopupOverlay();
  const navigate = useNavigate();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [_, setMainContentRef] = useAtom(MainContentRefAtom);
  const [showDebug, setShowDebug] = useState(false);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const { group: groupParam } = useParams();
  const { showFab } = useFab();

  // Computed Values

  const location = useLocation();
  const PlusMemo = memo(() => <Plus />);
  const isDev = import.meta.env.MODE == 'development';

  // --------------------------
  // Effects
  // --------------------------

  useEffect(() => {
    setMainContentRef(mainContentRef);
  }, []);

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  // --------------------------
  // Event Listeners
  // --------------------------

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '`') {
      setShowDebug(!showDebug);
    }
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 h-full bg-[#2F231D]/80 md:hidden"></div>
  ));

  // --------------------------
  // Component Render
  // --------------------------

  return (
    <ProtectedRoute>
      <PopupOverlay />
      <div
        className="bg-wheat-200 text-ink-800 font-outfit relative z-0 flex h-dvh w-full justify-end overflow-x-hidden overflow-y-auto md:justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {isDev && <Debug showDebug={showDebug} />}
        {/* This is the main container for the website */}
        <div className={`relative h-full min-w-dvw md:w-full md:max-w-190 md:min-w-0`}>
          {showSidebar && <Overlay />}
          <div
            ref={mainContentRef}
            className={`${showSidebar && 'sidebar'} relative flex h-full w-full flex-col overflow-y-auto md:h-fit not-md:[.sidebar]:overflow-y-hidden`}
          >
            <Header />
            <Outlet />
          </div>
          {showFab && (
            <Link to={ROUTES.NEW_TRANSACTION} state={{ groupId: groupParam }}>
              <FAB className={`absolute bottom-6 left-1/2 z-5 w-fit -translate-x-1/2 md:hidden`}>
                <PlusMemo />
                Add Transaction
              </FAB>
            </Link>
          )}
        </div>

        <div className="absolute inset-0 z-[-1] bg-[url(/bg/bg_pattern.png)] select-none" />
        <div className="absolute top-0 right-0 z-[-1] aspect-square h-50 bg-[url(/bg/bg_top.svg)] bg-contain bg-top-right bg-no-repeat" />
        <Sidebar />
      </div>
    </ProtectedRoute>
  );
}

export default App;
