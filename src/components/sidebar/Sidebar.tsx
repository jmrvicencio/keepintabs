import { memo, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { atom, useAtom } from 'jotai';

import { auth } from '../../lib/firebase/auth';
import { dataFetchedAtom } from '../../app/routes/App/App';
import { ROUTES } from '../../app/routes';
import { Plus } from 'lucide-react';
import FAB from '../FAB';

export const showSidebarAtom = atom(false);

function Sidebar() {
  const navigate = useNavigate();
  const [dataFetched, setDataFetched] = useAtom(dataFetchedAtom);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const showSidebarClass = showSidebar ? 'show-sidebar' : '';

  const handleSignoutClick = () => {
    auth.signOut();
    setShowSidebar(false);
    setDataFetched(false);
    navigate(ROUTES.LANDING);
  };

  const handleFabClicked = (e: MouseEvent) => {
    navigate(ROUTES.NEW_TRANSACTION);
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 h-full bg-[#2F231D]/80 md:hidden"></div>
  ));

  return (
    <div
      className={`${showSidebarClass} bg-wheat-200 top-0 z-20 w-[0dvw] max-w-4/5 shrink-0 transition-[width] duration-300 ease-in-out md:sticky md:h-fit md:w-64 md:pt-12 not-md:[.show-sidebar]:w-72`}
    >
      <div className="flex w-[60dvw] flex-row items-center justify-baseline gap-2 p-4" onClick={handleSignoutClick}>
        <LogOut className="h-4 w-4" />
        Sign Out
      </div>
      <div
        className="flex w-[60dvw] flex-row items-center justify-baseline gap-2 p-4"
        onClick={() => {
          setShowSidebar(false);
          navigate(ROUTES.TEST);
        }}
      >
        Navigate to Test
      </div>
      <div className="p-4">
        <FAB className="hidden md:block" onClick={handleFabClicked}>
          <Plus />
          Add Transaction
        </FAB>
      </div>
    </div>
  );
}

export default Sidebar;
