import { auth } from '../lib/firebase/auth';
import { User as UserIcon } from 'lucide-react';

function ProfileIcon({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="relative h-7 w-7 cursor-pointer" onClick={handleClick}>
      <div className="h-full w-full overflow-clip rounded-md border-1">
        {auth.currentUser && auth.currentUser.photoURL ? (
          <div className="h-full w-full bg-cover" style={{ backgroundImage: `url(${auth.currentUser.photoURL})` }} />
        ) : (
          // <img src={auth.currentUser.photoURL as string} className="w-full" />
          <div className="flex h-full w-full items-center justify-center p-0.5">
            <UserIcon className="w-full" />
          </div>
        )}
      </div>
      <div className="absolute -right-0.5 -bottom-0.5 z-[-1] h-full w-full rounded-md border-1 border-black bg-black" />
    </div>
  );
}

export default ProfileIcon;
