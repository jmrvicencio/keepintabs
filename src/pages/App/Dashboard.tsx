import { auth } from '../../firebase/auth';
import { User as UserImage, Plus } from 'lucide-react';
import { useAtom } from 'jotai';

import logo from '/logo-spaced.svg';
import UserIcon from '../../components/user_stack/UserIcon';
import { showSidebarAtom } from '../../components/sidebar/Sidebar';

function Dashboard() {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };
  const handleOverlayClicked = () => {
    setShowSidebar(false);
  };

  console.log('current user: ', auth.currentUser);

  return (
    <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
      {showSidebar && <div className="absolute inset-0 h-full w-full bg-black/60" onClick={handleOverlayClicked}></div>}
      <header className="flex flex-row justify-between">
        <div className="flex items-center">
          <img src={logo} className="h-9" />
          <p className="font-outfit text-xl">Keepin' Tabs</p>
        </div>
        <div className="h-7 w-7 cursor-pointer overflow-clip rounded-md bg-white/10" onClick={handleProfileClick}>
          {auth.currentUser && auth.currentUser.photoURL ? (
            <img src={auth.currentUser.photoURL as string} className="w-full" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-0.5">
              <UserImage className="w-full" />
            </div>
          )}
        </div>
      </header>
      <main className="flex flex-col items-start gap-8">
        <section className="flex flex-col items-start gap-1">
          <h1 className="font-noto-sans text-sand text-4xl font-medium">Debts Clear!</h1>
          <p>No outstanding balance</p>
        </section>
        <section className="w-full">
          <div className="mb-4 flex flex-row gap-2">
            <p className="font-normal">Groups</p>
            <div className="bg-accent-600 flex h-7 w-fit cursor-pointer items-center rounded-xl px-3">
              <Plus className="w-4" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-charcoal-800 flex w-full cursor-pointer flex-col gap-2 rounded-xl p-1">
              <div className="text-sand flex flex-row items-center justify-between px-2">
                <p className="font-medium">Coffee with the Boys</p>
                <div className="border-charcoal-600 flex flex-row items-center rounded-full border-1 p-1 pl-2">
                  <p className="font-noto-sans mr-2 align-top text-base/4">1</p>
                  <UserIcon />
                  <UserIcon />
                  <UserIcon />
                </div>
              </div>
              <div className="bg-charcoal-700 flex w-full flex-row justify-between gap-2 rounded-lg p-2">
                <div className="bg-accent-200 w-2 rounded-xs" />
                <p className="grow-1 text-left">You Owe</p>
                <p className="font-noto-sans text-accent-200">PHP 4,260.00</p>
              </div>
            </div>
            <div className="border-charcoal-700 flex w-full cursor-pointer flex-col gap-2 rounded-xl border-1 p-1">
              <div className="text-sand flex flex-row items-center justify-between px-2">
                <p className="font-medium">Non Grouped Expenses</p>
              </div>
              <div className="bg-charcoal-500 flex w-full flex-row justify-between gap-2 rounded-lg p-2">
                <div className="bg-accent-200 w-2 rounded-xs" />
                <p className="grow-1 text-left">You Owe</p>
                <p className="font-noto-sans text-accent-200">PHP 4,260.00</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
