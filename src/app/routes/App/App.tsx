import { KeyboardEvent, useState, memo, useEffect, useRef, type MouseEvent } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [_, setMainContentRef] = useAtom(MainContentRefAtom);
  const [showDebug, setShowDebug] = useState(false);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const { group: groupParam } = useParams();

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

  const handleFabClicked = (e: MouseEvent) => {
    navigate(ROUTES.NEW_TRANSACTION, { state: { groupId: groupParam } });
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 h-full bg-[#2F231D]/80 md:hidden"></div>
  ));

  return (
    <ProtectedRoute>
      <div
        className="bg-wheat-200 text-ink-800 font-outfit relative z-0 flex h-dvh w-full justify-end overflow-x-hidden overflow-y-auto md:justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Debug showDebug={showDebug} />
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
            <FAB className="absolute bottom-6 left-1/2 z-5 w-fit -translate-x-1/2 md:hidden" onClick={handleFabClicked}>
              <PlusMemo />
              Add Transaction
            </FAB>
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
