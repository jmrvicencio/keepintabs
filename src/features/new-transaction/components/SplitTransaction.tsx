import { useState, useRef, useReducer, useMemo, useLayoutEffect, useEffect, type ChangeEvent, MouseEvent } from 'react';
import { type DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

import { Group } from '@/features/groups/types';
import { User as UserIcon } from 'lucide-react';
import useDigitField from '@/hooks/useDigitField';
import Panel from '@/components/neubrutalist/Panel';
import { type SplitType, ItemizedEntry } from '@/app/routes/App/NewTransaction';

// ------------------------------
// Type Declarations
// ------------------------------

interface SplitTotalActions {
  nextTotal?: string;
  type: 'handle_change' | 'set_total';
}

/**
 *
 * @param {SplitType} splitType - The string name for the type of split to use
 * @param {string} total - The state used for the string representation of the total.
 */
const SplitTransactionPage = ({
  splitType: splitTypeState,
  total: totalState,
  currGroup,
  memberPhotoUrls,
}: {
  splitType: [SplitType, (val: SplitType) => any];
  total: [string, (val: string) => any];
  currGroup?: DocumentSnapshot<Group, DocumentData>;
  memberPhotoUrls: Record<string, string | undefined>;
}) => {
  // ------------------------------
  // Local References
  // ------------------------------

  const isFirstRender = useRef(true);
  const itemDescRef = useRef<(HTMLTextAreaElement | null)[]>([]);
  const itemPriceRef = useRef<(HTMLInputElement | null)[]>([]);
  const remainderRef = useRef<HTMLInputElement>(null);

  // ------------------------------
  // Local States
  // ------------------------------

  const [total, setTotal] = totalState; // The total prop that will get passsed back to the parent component
  const [localTotal, setLocalTotal] = useState(totalState[0]); // Local total to use for the split
  const [splitType, setSplitType] = splitTypeState;
  const [remainder, setRemainder] = useState(0);
  const [itemizedData, setItemizedData] = useState<ItemizedEntry[]>([]);
  const [toggleFocus, setToggleFocus] = useState<boolean>(false);

  // ------------------------------
  // Computed Variables
  // ------------------------------

  const itemizedPrices = itemizedData.map((item) => item.amount).join('|');
  const itemizedTotal = useMemo(() => {
    return itemizedData.reduce(
      (acc, item) => Math.floor(acc + Number(item.amount.replaceAll(',', '').replaceAll('.', ''))),
      0,
    );
  }, [itemizedPrices]);
  const splitTotalNum = Number(localTotal);
  const groupData = currGroup?.data();

  // ------------------------------
  // Effects
  // ------------------------------

  useEffect(() => {
    if (isFirstRender.current == true) {
      isFirstRender.current = false;
      return;
    }

    console.log('updating split total');
    const totalNumber = Number(localTotal.replaceAll(',', '').replaceAll('.', ''));
    const nextRemainder = remainder == 0 ? 0 : itemizedTotal < totalNumber ? totalNumber - itemizedTotal : 0;
    const nextTotal = itemizedTotal + nextRemainder;

    // field cant be empty so we need to put a placeholder of 0.00
    let nextTotalString = `${nextTotal}`;
    if (nextTotalString.length <= 0) nextTotalString = '0.00';
    const isOnlyDigits = /^(\d|\,|\.)+$/.test(nextTotalString);
    if (!isOnlyDigits) return;

    setLocalTotal(formatToDigit(nextTotalString));
    setRemainder(nextRemainder);
  }, [itemizedTotal]);

  useLayoutEffect(() => {
    itemDescRef.current[itemizedData.length - 1]?.focus();
  }, [toggleFocus]);

  // ------------------------------
  // Event Handlers
  // ------------------------------

  const handleLocalTotalChanged = (e: ChangeEvent<HTMLInputElement>) => {
    let nextVal: string = e.currentTarget.value ?? '';

    // field cant be empty so we need to put a placeholder of 0.00
    if (nextVal.length <= 0) nextVal = '0.00';
    const isOnlyDigits = /^(\d|\,|\.)+$/.test(nextVal);
    if (!isOnlyDigits) return;

    const formattedVal = formatToDigit(nextVal);
    let nextValNumber = Number(formattedVal.replaceAll(',', '').replaceAll('.', ''));

    if (nextValNumber >= itemizedTotal) {
      setLocalTotal(formattedVal);
    } else {
      setLocalTotal(formatToDigit(`${itemizedTotal}`));
    }
    const nextRemainder = Math.floor(nextValNumber - itemizedTotal);
    setRemainder(nextRemainder);
  };

  const handleAddItem = () => {
    const nextItemizedData = [...itemizedData];
    const nextItem: ItemizedEntry = {
      description: '',
      amount: '0.00',
      payingMembers: new Set<string>(),
    };
    nextItemizedData.push(nextItem);
    setItemizedData(nextItemizedData);
    setToggleFocus(!toggleFocus);

    itemDescRef.current[nextItemizedData.length - 1]?.focus();
  };

  const handleItemDescChanged = (i: number) => {
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      let nextVal = e.currentTarget.value;
      const nextSplitData = [...itemizedData];

      nextSplitData[i] = { ...nextSplitData[i], description: nextVal };
      setItemizedData(nextSplitData);
      console.log(nextSplitData);
    };
  };

  const handleItemPriceChanged = (i: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let nextVal = e.currentTarget.value;
      const nextSplitData = [...(itemizedData as ItemizedEntry[])];

      // Check if the input is valid (numbers only)
      if (nextVal.length <= 1) nextVal = '0.0' + nextVal;
      const isOnlyDigits = /^(\d|\,|\.)+$/.test(nextVal);
      if (!isOnlyDigits) return;

      nextVal = formatToDigit(nextVal);

      nextSplitData[i] = { ...nextSplitData[i], amount: nextVal };
      setItemizedData(nextSplitData);
    };
  };

  const handleRemoveItemClicked = (i: number) => {
    return () => {
      const nextItemizedData = [...itemizedData.slice()];
      nextItemizedData.splice(i, 1);

      setItemizedData(nextItemizedData);
    };
  };

  const handleMemberClicked = (i: number, memberGroupId: string) => {
    return (e: MouseEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      const nextItemizedData = [...itemizedData];

      nextItemizedData[i] = { ...nextItemizedData[i], payingMembers: new Set([...nextItemizedData[i].payingMembers]) };

      if (isChecked) nextItemizedData[i].payingMembers.add(memberGroupId);
      else nextItemizedData[i].payingMembers.delete(memberGroupId);

      setItemizedData(nextItemizedData);
    };
  };

  return (
    <div className="px-4 outline-none">
      <div className="m-auto max-w-120 border-1 border-black bg-white p-6">
        <div className="border-ink-400 gap:2 relative flex flex-col border-b-1 border-dashed py-6">
          <h2 className="font-gieonto text-4xl">Split Type</h2>
          <div className="flex flex-row justify-center gap-2 py-4">
            <input
              type="button"
              value="Balanced"
              className={`${splitType == 'balanced' && 'selected'} border-ink-400 cursor-pointer rounded-md border-1 px-3 py-0.5 [.selected]:bg-black [.selected]:text-white`}
              onClick={() => setSplitType('balanced')}
            />
            <input
              type="button"
              value="Itemized"
              className={`${splitType == 'itemized' && 'selected'} border-ink-400 cursor-pointer rounded-md border-1 px-3 py-0.5 [.selected]:bg-black [.selected]:text-white`}
              onClick={() => setSplitType('itemized')}
            />
          </div>
        </div>
        <div className="border-ink-400 relative flex flex-col border-b-1 border-dashed py-6">
          <input
            id="total"
            type="text"
            autoComplete="off"
            step="off"
            min="0"
            inputMode="decimal"
            className={`peer w-full rounded-md border-0 text-center text-4xl font-bold outline-none`}
            maxLength={32}
            onChange={handleLocalTotalChanged}
            value={localTotal}
            autoFocus
          />
          <div className="flex flex-row justify-center">
            <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
              Total Amount
            </label>
            <p className="font-bold">(PHP)</p>
          </div>
        </div>
        {splitType == 'itemized' ? (
          <>
            {itemizedData.map((itemizedItem, i) => (
              <div key={i} className="border-ink-400 relative flex flex-col gap-2 border-b-1 border-dashed py-6">
                <div className="flex flex-row items-center gap-1">
                  <textarea
                    id="item-desc"
                    ref={(elem) => {
                      itemDescRef.current[i] = elem;
                    }}
                    data-testid="item-desc"
                    placeholder="Description"
                    onChange={handleItemDescChanged(i)}
                    value={itemizedData[i].description}
                    className="field-sizing-content shrink-1 grow-1 resize-none px-1"
                    autoComplete="off"
                  />
                  <p>Php</p>
                  <input
                    id="item-price"
                    type="text"
                    ref={(elem) => {
                      itemPriceRef.current[i] = elem;
                    }}
                    data-testid="item-price"
                    placeholder="0.00"
                    onChange={handleItemPriceChanged(i)}
                    value={itemizedItem.amount}
                    className="font-courier-prime field-sizing-content max-w-1/2 px-1"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {groupData &&
                    Object.entries(groupData.members).map(([memberGroupId, member]) => {
                      const membersSplitting = itemizedItem.payingMembers.size;
                      const itemizedItemAmount = Number(itemizedItem.amount.replaceAll(',', '').replaceAll('.', ''));
                      const itemizedSplit = Math.floor(itemizedItemAmount / membersSplitting);

                      return (
                        <div key={memberGroupId} className="flex flex-row items-center justify-baseline gap-2">
                          <input
                            // {...(itemizedItem.payingMembers.has(memberGroupId) && { checked: true })}
                            checked={itemizedItem.payingMembers.has(memberGroupId)}
                            onClick={handleMemberClicked(i, memberGroupId)}
                            id={`split-${i}-${memberGroupId}`}
                            type="checkbox"
                            className="h-4 w-4 rounded-sm accent-black checked:bg-black"
                          />
                          <label
                            htmlFor={`split-${i}-${memberGroupId}`}
                            className="text-ink-400 flex w-full flex-row gap-2 font-light"
                          >
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
                            <p className="grow text-left">{member.displayName}</p>
                            <p className="text-sm">
                              Php{' '}
                              <span className="font-courier-prime">
                                {itemizedItem.payingMembers.has(memberGroupId)
                                  ? formatToDigit(`${itemizedSplit}`)
                                  : '0.00'}
                              </span>
                            </p>
                          </label>
                        </div>
                      );
                    })}
                </div>
                <div className="">
                  <input
                    type="button"
                    value="Remove Item"
                    onClick={handleRemoveItemClicked(i)}
                    className="border-ink-400 cursor-pointer rounded-md border px-3 py-0.5"
                  />
                </div>
              </div>
            ))}
            {remainder > 0 && (
              <div className="border-ink-400 relative flex flex-row gap-2 border-b border-dashed py-6">
                <label htmlFor="remainder" className="shrink grow text-left">
                  Remainder
                </label>
                <p>Php</p>
                <input
                  id="remainder"
                  ref={remainderRef}
                  type="text"
                  value={formatToDigit(`${remainder}`)}
                  readOnly={true}
                  className="font-courier-prime field-sizing-content max-w-1/2 px-1 outline-0"
                />
              </div>
            )}
            <div className="border-ink-400 relative flex flex-col pt-6">
              <div className="m-auto w-fit">
                <Panel
                  bgColor="bg-accent-200"
                  padding="px-3 py-2"
                  className="w-fit cursor-pointer"
                  dropOnClick={true}
                  onClick={handleAddItem}
                >
                  Add Item
                </Panel>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SplitTransactionPage;
