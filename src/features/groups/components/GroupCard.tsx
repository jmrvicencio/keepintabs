import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../../components/user_stack/UserIcon';
import { Group } from '../types';

import { Link } from 'react-router-dom';
import { getGroupRoute } from '../../../app/routes';
import Panel from '../../../components/neubrutalist/Panel';
import { ChevronDown } from 'lucide-react';
import { getSimplifiedBalance, getTotalFromSimplified } from '../utils/balance';
import { getUserGroupId } from '../utils/memberUtil';
import { auth } from '@/lib/firebase/auth';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

const GroupCard = memo(function TabGroup({ id, group }: { id: string; group: Group }) {
  const simplifiedBalance = getSimplifiedBalance(group);
  const userGroupId = getUserGroupId(auth.currentUser!.uid, group);
  const total = getTotalFromSimplified(userGroupId, simplifiedBalance);
  const navigate = useNavigate();

  const memberCount = Object.keys(group.members).length;
  const memberCountLabel = `${memberCount} Member${memberCount > 1 ? 's' : ''}`;

  return (
    <Link to={getGroupRoute(id)}>
      <Panel bgColor="bg-accent-200" padding="p-3" dropOnClick={true} className="flex flex-row items-center gap-2">
        <div className="bg-accent-100 flex h-6 w-6 items-center justify-center rounded-sm">
          <ChevronDown />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between px-2 text-base/tight font-medium">
            <h3 className="font-medium">{group.name}</h3>
            <p>{formatToDigit(total)}</p>
          </div>
          <div className="flex w-full flex-row justify-between gap-2 rounded-lg text-sm">
            <div>
              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-row items-center rounded-full">
                  {[...Array(3)].map((_, i) => {
                    const member = Object.values(group?.members)?.[i] ?? undefined;

                    return <UserIcon key={i} imageUrl={member?.photoUrl ?? ''} />;
                  })}
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
    </Link>
  );
});

export default GroupCard;
