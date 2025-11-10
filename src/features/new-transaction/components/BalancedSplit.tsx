import { useState, useRef, useMemo, useEffect, type ChangeEvent } from 'react';
import { type DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';
import { formattedStrToNum } from '@/util/helpers';

import { UserIcon, Check } from 'lucide-react';
import { Group } from '@/features/groups/types';
import { SplitType } from '@/features/transactions/types';
import { BalancedData } from './SplitTransaction';

const BalancedSplit = ({
  balancedData: [balancedData, setBalancedData],
  localTotal,
  groupData,
  memberPhotoUrls,
}: {
  balancedData: [BalancedData, (val: BalancedData) => any];
  localTotal: string;
  groupData: Group | undefined;
  memberPhotoUrls: Record<string, string | undefined>;
}) => {
  const splits = balancedData.payingMembers.size;
  const balancedSplit = Math.floor(formattedStrToNum(localTotal) / splits);

  // ------------------------------
  // Event Handlers
  // ------------------------------

  const handleChanged = (memberGroupId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const { error: _, ...nextBalancedData } = balancedData;
    const nextPayingMembers = new Set([...nextBalancedData.payingMembers]);
    nextBalancedData.payingMembers = nextPayingMembers;

    if (isChecked) nextPayingMembers.add(memberGroupId);
    else nextPayingMembers.delete(memberGroupId);

    setBalancedData(nextBalancedData);
  };

  return (
    <div className="flex flex-col gap-2 py-6">
      <h3 className="font-semibold">Members Split</h3>
      {Object.entries(groupData?.members ?? {}).map(([memberGroupId, member]) => {
        const memberChecked = balancedData.payingMembers.has(memberGroupId);
        const splitPercent = memberChecked ? 1 / splits : 0;

        return (
          <div key={memberGroupId} className="flex flex-row items-center justify-baseline gap-2">
            <input
              id={`balanced-${memberGroupId}`}
              type="checkbox"
              checked={memberChecked}
              onChange={handleChanged(memberGroupId)}
              className="qh-4 sr-only w-4 rounded-sm accent-black checked:bg-black"
            />{' '}
            <label
              htmlFor={`balanced-${memberGroupId}`}
              data-testid={'balanced-member'}
              className={`${balancedData.error && 'error'} border-ink-300 flex w-full cursor-pointer flex-row items-center gap-2 overflow-clip rounded-xl border bg-black/2 p-2 py-3 pr-3 font-light text-black [.error]:border-red-500`}
            >
              <div
                className={`${memberChecked && 'checked'} group [.checked]:bg-accent-600 ml-2 flex aspect-square h-4 w-4 items-center justify-center rounded-full border-black/80 not-[.checked]:border`}
              >
                <Check className="h-3 text-white not-group-[.checked]:hidden" strokeWidth="3" />
              </div>
              <div
                {...(memberPhotoUrls[memberGroupId] && {
                  style: {
                    backgroundImage: `url('${memberPhotoUrls[memberGroupId]}')`,
                  },
                })}
                className={`${!memberPhotoUrls[memberGroupId] && 'border'} border-ink-400 flex h-6 w-6 items-center justify-center rounded-full bg-cover`}
              >
                {!memberPhotoUrls[memberGroupId] && <UserIcon className="text-ink-400" />}
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-row items-center gap-2">
                  <p className="grow text-left">{member.displayName}</p>
                  <p className="text-sm">
                    Php{' '}
                    <span className="font-courier-prime" data-testid="balanced-amt">
                      {balancedData.payingMembers.has(memberGroupId) ? formatToDigit(`${balancedSplit}`) : '0.00'}
                    </span>
                  </p>
                </div>
                <div className="relative z-0 h-2 w-full overflow-clip rounded-full bg-black/10">
                  <div
                    className="bg-accent-600 absolute top-0 bottom-0 left-0 -z-1 w-full origin-left transition-transform"
                    style={{ transform: `scaleX(${splitPercent})` }}
                  />
                </div>
              </div>
            </label>
          </div>
        );
      })}
      {balancedData.error && <p className="text-sm text-red-500">{balancedData.error}</p>}
    </div>
  );
};

export default BalancedSplit;
