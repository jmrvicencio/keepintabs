import { useState, useRef, useMemo, useEffect, type ChangeEvent } from 'react';
import { type DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';
import { formattedStrToNum } from '@/util/helpers';

import { UserIcon, Check } from 'lucide-react';
import { Group } from '@/features/groups/types';
import { SplitType } from '@/features/transactions/types';

const BalancedSplit = ({
  balancedData: [balancedData, setBalancedData],
  localTotal,
  groupData,
  memberPhotoUrls,
}: {
  balancedData: [Set<string>, (val: Set<string>) => any];
  localTotal: string;
  groupData: Group | undefined;
  memberPhotoUrls: Record<string, string | undefined>;
}) => {
  const splits = balancedData.size;
  const balancedSplit = Math.floor(formattedStrToNum(localTotal) / splits);

  // ------------------------------
  // Event Handlers
  // ------------------------------

  const handleChanged = (memberGroupId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const nextBalancedData = new Set([...balancedData]);

    if (isChecked) nextBalancedData.add(memberGroupId);
    else nextBalancedData.delete(memberGroupId);

    setBalancedData(nextBalancedData);
  };

  return (
    <div className="flex flex-col gap-2 py-6">
      <h3 className="font-semibold">Members Split</h3>
      {Object.entries(groupData?.members ?? {}).map(([memberGroupId, member]) => {
        const memberChecked = balancedData.has(memberGroupId);
        const splitPercent = memberChecked ? 1 / splits : 0;

        return (
          <div key={memberGroupId} className="flex flex-row items-center justify-baseline gap-2">
            <input
              id={`balanced-${memberGroupId}`}
              type="checkbox"
              checked={memberChecked}
              onChange={handleChanged(memberGroupId)}
              className="sr-only h-4 w-4 rounded-sm accent-black checked:bg-black"
            />{' '}
            <label
              htmlFor={`balanced-${memberGroupId}`}
              className="border-ink-300 flex w-full cursor-pointer flex-row items-center gap-2 overflow-clip rounded-xl border bg-black/2 p-2 py-3 pr-3 font-light text-black"
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
                      {balancedData.has(memberGroupId) ? formatToDigit(`${balancedSplit}`) : '0.00'}
                    </span>
                  </p>
                </div>
                <div className="bg-accent-600/20 relative z-0 h-2 w-full overflow-clip rounded-full">
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
    </div>
  );
};

export default BalancedSplit;
