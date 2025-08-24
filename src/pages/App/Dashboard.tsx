import { auth } from '../../firebase/auth';

import { User as UserImage } from 'lucide-react';
import logo from '/logo-spaced.svg';

function Dashboard() {
  console.log('current user: ', auth.currentUser);
  return (
    <div className="bg-olive text-cream flex h-dvh w-full flex-row items-center justify-between px-3">
      <div className="flex items-center">
        <img src={logo} className="h-8" />
        <p className="font-outfit text-lg">Keepin' Tabs</p>
      </div>
      <div className="h-6 w-6 cursor-pointer rounded-sm bg-white/10">
        {auth.currentUser && auth.currentUser.photoURL ? (
          <img src={auth.currentUser.photoURL as string} className="w-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-0.5">
            <UserImage className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
