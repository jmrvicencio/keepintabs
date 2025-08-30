import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from './user_stack/UserIcon';

const TabGroup = memo(({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();

  const handleGroupClicked = () => {
    navigate(`${id}`);
  };

  return (
    <div
      className="bg-charcoal-800 flex w-full cursor-pointer flex-col gap-2 rounded-xl p-1"
      onClick={handleGroupClicked}
    >
      <div className="text-sand flex flex-row items-center justify-between px-2">
        <p className="font-medium">{name}</p>
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
  );
});

export default TabGroup;
