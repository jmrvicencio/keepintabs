import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { atom, useAtom } from 'jotai';
import { auth } from '../../firebase/auth';

export const showSidebarAtom = atom(false);

function Sidebar() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const showSidebarClass = showSidebar ? 'show-sidebar' : '';

  const handleSignoutClick = () => {
    auth.signOut();
    setShowSidebar(false);
    navigate('/');
  };

  return (
    <div
      className={`${showSidebarClass} w-[0dvw] max-w-4/5 shrink-0 transition-[width] duration-300 ease-in-out [.show-sidebar]:w-72`}
    >
      <div className="flex w-[60dvw] flex-row items-center justify-baseline gap-2 p-4" onClick={handleSignoutClick}>
        <LogOut className="h-4 w-4" />
        Sign Out
      </div>
      <div
        className="flex w-[60dvw] flex-row items-center justify-baseline gap-2 p-4"
        onClick={() => {
          navigate('/test');
        }}
      >
        Navigate to Test
      </div>
    </div>
  );
}

export default Sidebar;
