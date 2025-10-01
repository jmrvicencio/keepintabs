import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../../components/user_stack/UserIcon';
import { Group } from '../types';

import { getGroupRoute } from '../../../app/routes';
import Panel from '../../../components/neubrutalist/Panel';
import { ChevronDown } from 'lucide-react';

const GroupCard = memo(function TabGroup({ id, group }: { id: string; group: Group }) {
  const navigate = useNavigate();

  const memberCount = Object.keys(group.members).length;
  const memberCountLabel = `${memberCount} Member${memberCount > 1 ? 's' : ''}`;

  const handleGroupClicked = () => {
    navigate(getGroupRoute(id));
  };

  return (
    <Panel
      bgColor="bg-accent-200"
      onClick={handleGroupClicked}
      padding="p-3"
      dropOnClick={true}
      className="flex flex-row items-center gap-2"
    >
      <div className="bg-accent-100 flex h-6 w-6 items-center justify-center rounded-sm">
        <ChevronDown />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center justify-between px-2 text-base/tight font-medium">
          <h3 className="font-medium">{group.name}</h3>
          <p>Php 4,260.00</p>
          {/* <div className="border-charcoal-600 flex flex-row items-center rounded-full border-1 p-1 pl-2">
            <p className="font-noto-sans mr-2 align-top text-base/4">1</p>
            <UserIcon />
            <UserIcon />
            <UserIcon />
          </div> */}
        </div>
        <div className="flex w-full flex-row justify-between gap-2 rounded-lg text-sm">
          <div>
            <div className="flex flex-row items-center gap-1">
              <div className="flex flex-row items-center rounded-full">
                <UserIcon />
                <UserIcon />
                <UserIcon />
              </div>
              <p>{memberCountLabel}</p>
            </div>
          </div>
          <p className="flex flex-row items-center gap-1">
            You are owed
            <span className="bg-positive-500 box-content h-2 w-2 rounded-full border-2 border-white" />
          </p>
        </div>
      </div>
    </Panel>
  );
});

export default GroupCard;
