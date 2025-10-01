import { auth } from '../lib/firebase/auth';
import { User as UserIcon } from 'lucide-react';

function ProfileIcon({ handleClick, className }: { handleClick: () => void; className: string }) {
  return (
    <div className={'relative h-7 w-7 cursor-pointer ' + className} onClick={handleClick}>
      <div className="h-full w-full overflow-clip rounded-md border-1 bg-white">
        {auth.currentUser && auth.currentUser.photoURL ? (
          <div className="h-full w-full bg-cover" style={{ backgroundImage: `url(${auth.currentUser.photoURL})` }} />
        ) : (
          // <img src={auth.currentUser.photoURL as string} className="w-full" />
          <div className="bg-accent-200 flex h-full w-full items-center justify-center p-0.5">
            <UserIcon className="text-ink-800/70 w-full stroke-white" />
          </div>
        )}
      </div>
      <div className="absolute -right-0.5 -bottom-0.5 z-[-1] h-full w-full rounded-md border-1 border-black bg-black" />
    </div>
  );
}

export default ProfileIcon;
