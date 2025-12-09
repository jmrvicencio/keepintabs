import { useState, useEffect, useMemo, useRef, type MouseEvent } from 'react';
import { type DocumentSnapshot } from 'firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import { buttonHandleKeypress } from '@/util/buttonHandleKeypress';
import { getUserGroupId } from '@/features/groups/utils/memberUtil';
import { BalancedSplit, SplitData, SplitTotal, Transaction } from '@/features/transactions/types';
import { formattedStrToNum } from '@/util/helpers';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

// Import Custom Components
import { ListFilter, X } from 'lucide-react';

// Import Custom Hooks
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { Group, Member } from '@/features/groups/types';
import { PopupMenu } from '@/features/popup-menu/stores/PopupAtom';

const TransactionBreakdown = ({
  splitData,
  splitTotals,
  total,
  currGroup,
}: {
  splitData: SplitData;
  splitTotals: SplitTotal;
  total: string;
  currGroup: Group | undefined;
}) => {
  // Hooks
  const { setShowPopup, setPopup, callPopup, resetPopup } = usePopupOverlay();
  const filterRef = useRef(null);

  // Local States
  const [filterUid, setFilterUid] = useState<string>(getUserGroupId(auth.currentUser!.uid, currGroup) ?? '');
  const [isFiltering, setIsFiltering] = useState(false);

  // ------------------------------
  // Computed Values
  // ------------------------------

  const personalAmtNum = useMemo(() => {
    if (splitData.type == 'balanced') {
      return Math.floor(formattedStrToNum(total) / (splitData.data as BalancedSplit).payingMembers.size);
    } else if (splitData.type == 'itemized') {
      return 0;
    }
    return 0;
  }, [total, splitData]);

  const filterName = useMemo(() => currGroup?.members[filterUid]?.displayName ?? 'Unknown', [filterUid, currGroup]);

  const personalAmt = useMemo(() => {
    return formatToDigit(splitTotals[filterUid] ?? 0);
  }, [splitTotals, filterUid]);

  const options = useMemo(() => {
    const members: Record<string, Member> = currGroup?.members ?? {};

    return Object.entries(members).map(([userGroupId, member]) => {
      return {
        label: member.displayName,
        action: () => {
          const isCurrentUser = auth.currentUser!.uid == member.linkedUid;

          setFilterUid(userGroupId);
          setIsFiltering(!isCurrentUser);
          resetPopup();
        },
      };
    });
  }, [currGroup]);

  // ------------------------------
  // Effects
  // ------------------------------

  useEffect(() => {
    setFilterUid(getUserGroupId(auth.currentUser!.uid, currGroup) ?? '');
  }, [currGroup]);

  // ------------------------------
  // Event Handlers
  // ------------------------------

  const handleFilterMemberClicked = () => {
    const members = Object.entries(currGroup?.members ?? {});

    const popup: PopupMenu = {
      type: 'menu',
      reference: filterRef,
      options: options,
    };

    callPopup(popup);
  };

  const handleXFilterClicked = (e: MouseEvent) => {
    e.stopPropagation();
    const userGroupId = getUserGroupId(auth.currentUser!.uid, currGroup);

    setIsFiltering(false);
    setFilterUid(userGroupId ?? '');
  };

  return (
    <div className="my-6 flex w-full max-w-130 flex-col gap-4 rounded-xl bg-black px-3 py-4">
      <div
        role="button"
        aria-label="filter member"
        ref={filterRef}
        onKeyDown={buttonHandleKeypress(handleFilterMemberClicked)}
        className="flex cursor-pointer flex-row items-center justify-end gap-2 text-white"
        onClick={handleFilterMemberClicked}
      >
        {isFiltering ? (
          <>
            <p className="sr-only">filtering member </p>
            <p>{filterName}</p>
            <X className="h-4 w-4" onClick={handleXFilterClicked} />
          </>
        ) : (
          <>
            <p className="font-extralight">filter member</p>
          </>
        )}
        <ListFilter className="h-4 w-4" />
      </div>
      <div className="bg-accent-200 flex flex-col items-center justify-center rounded-xl py-3">
        <p id="personal-share" aria-label="member share" className="w-fit text-4xl font-bold outline-0">
          {personalAmt ?? ''}
        </p>
        <label htmlFor="personal-share" className="text-xl font-light">
          {!isFiltering ? 'Your Share' : `${filterName}'s Share`}
        </label>
      </div>
      <div className="flex flex-col gap-2 px-2 text-white">
        <h3 className="w-fit">Breakdown</h3>
        {(splitTotals[filterUid] ?? 0) > 0 ? (
          splitData.type == 'balanced' ? (
            <div className="flex justify-between">
              <p className="text-sm font-extralight">Even Split</p>
              <p arlia-label="even split" className="w-fit font-light outline-none">
                {personalAmt}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {splitData.data.entries.map(
                (entry, i) =>
                  entry.payingMembers.has(filterUid) && (
                    <div key={i} className="flex justify-between">
                      <p className="text-sm font-extralight">
                        {entry.description == '' ? '(No Description)' : entry.description}
                      </p>
                      <p
                        aria-label={`${entry.description} share`}
                        className="field-sizing-content font-light outline-none"
                      >
                        {formatToDigit(Math.floor(entry.amount / entry.payingMembers.size))}
                      </p>
                    </div>
                  ),
              )}
              {splitData.data.remainder.amount > 0 && (
                <div className="flex justify-between">
                  <p className="text-sm font-extralight">Remainder</p>
                  <p aria-label="remainder share" className="field-sizing-content font-light outline-none">
                    {formatToDigit(
                      Math.floor(splitData.data.remainder.amount / splitData.data.remainder.payingMembers.size),
                    )}
                  </p>
                </div>
              )}
            </div>
          )
        ) : (
          <p className="text-small text-left text-sm font-extralight">No Share</p>
        )}
      </div>
    </div>
  );
};

export default TransactionBreakdown;
