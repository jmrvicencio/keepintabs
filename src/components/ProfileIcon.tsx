import { auth } from '../firebase/auth';
import { User as UserIcon } from 'lucide-react';

function ProfileIcon({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="h-7 w-7 cursor-pointer overflow-clip rounded-md bg-white/10" onClick={handleClick}>
      {auth.currentUser && auth.currentUser.photoURL ? (
        <img src={auth.currentUser.photoURL as string} className="w-full" />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-0.5">
          <UserIcon className="w-full" />
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
