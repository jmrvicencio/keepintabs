import { ExoticComponent, memo, ReactNode, useRef, useState, type MouseEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LogOut, Ellipsis } from 'lucide-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { auth } from '../../lib/firebase/auth';
import { dataFetchedAtom, type DataFetched } from '../../features/groups/stores/dataFetched';
import { showSidebarFabAtom } from '@/store/sidebar';
import { ROUTES } from '../../app/routes';
import { Plus, Mail } from 'lucide-react';
import FAB from '@/features/fab/components/FAB';
import useNotifications from '@/features/notifications/hooks/useNotifications';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { PopupMenu } from '@/features/popup-menu/types';

export const showSidebarAtom = atom(false);
const writeDataFetchedAtom = atom(null, (_get, set, fetched: boolean) => {
  set(dataFetchedAtom, (dataFetched: DataFetched) => {
    const newDataFetched = { ...dataFetched };
    newDataFetched.fetched = fetched;
    return newDataFetched;
  });
});

function Sidebar() {
  // Refs
  const profileRef = useRef(null);

  // Hooks
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const { group: groupParam } = useParams();
  const { setShowPopup, setPopup } = usePopupOverlay();

  // State
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const [showAddTransaction, _] = useAtom(showSidebarFabAtom);
  const setDataFetched = useSetAtom(writeDataFetchedAtom);
  const [showFloatingMenu, setShowFloatingMenu] = useState<boolean>(false);

  // Computed Values
  const showSidebarClass = showSidebar ? 'show-sidebar' : '';
  const hasNotifs = notifications?.docs.some((notif) => !notif.data().seen) ?? false;

  // -----------------
  // Event Handlers
  // -----------------

  const handleSignoutClick = () => {
    auth.signOut();
    setShowSidebar(false);
    setDataFetched(false);
    navigate(ROUTES.LANDING);
  };

  const handleProfileClicked = () => {
    const popup: PopupMenu = {
      type: 'menu',
      options: [
        {
          label: 'Logout',
          icon: LogOut,
          action: () => {
            handleSignoutClick();
          },
        },
      ],
      reference: profileRef,
    };

    setPopup(popup);
    setShowPopup(true);
  };

  const Overlay = memo(() => (
    <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 h-full bg-[#2F231D]/80 md:hidden"></div>
  ));

  return (
    <div
      className={`${showSidebarClass} bg-wheat-200 top-0 z-20 w-0 max-w-4/5 shrink-0 pt-4 transition-[width] duration-300 ease-in-out md:sticky md:h-fit md:w-64 md:pt-12 not-md:[.show-sidebar]:w-72`}
    >
      <div className="relative px-2">
        <div
          ref={profileRef}
          className="flew-row hover:bg-wheat-400/40 flex cursor-pointer items-center gap-2 rounded-full p-2 transition-colors select-none"
          onClick={handleProfileClicked}
        >
          <div
            className="bg-wheat-400 aspect-square h-8 w-8 rounded-full bg-cover"
            style={{
              backgroundImage: `url("${auth.currentUser!.photoURL}")`,
            }}
          />
          <h3 className="grow text-left font-semibold">{auth.currentUser!.displayName}</h3>
          <Ellipsis className="aspect-square w-5" />
        </div>
      </div>
      <Link to={ROUTES.NOTIFICATION}>
        <div className="flex cursor-pointer flex-row items-center gap-2 p-4">
          <div className="relative h-5 w-5">
            {hasNotifs && (
              <div className="bg-accent-600 absolute top-0 right-0 h-2 w-2 translate-x-0.5 -translate-y-0.5 rounded-full" />
            )}
            <Mail className="h-full w-full stroke-2" />
          </div>
          Invites
        </div>
      </Link>
      <div className="p-4">
        <Link
          className={`${!showAddTransaction && 'lock'} [.lock]:pointer-events-none [.lock]:select-none`}
          to={ROUTES.NEW_TRANSACTION}
          state={{ groupId: groupParam }}
        >
          <FAB locked={!showAddTransaction} className="hidden cursor-pointer md:block">
            <Plus />
            Add Transaction
          </FAB>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
