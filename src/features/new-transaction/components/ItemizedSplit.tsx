import { useState, useLayoutEffect, type ChangeEvent, MouseEvent, RefObject } from 'react';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

import { User as UserIcon } from 'lucide-react';
import { Group } from '@/features/groups/types';
import Panel from '@/components/neubrutalist/Panel';
import { type ItemizedEntry } from '@/app/routes/App/NewTransaction';

const ItemizedSplit = ({
  itemizedData: [itemizedData, setItemizedData],
  remainder: [remainder, setRemainder],
  itemDescRef,
  itemPriceRef,
  remainderRef,
  groupData,
  memberPhotoUrls,
}: {
  itemizedData: [ItemizedEntry[], (val: ItemizedEntry[]) => any];
  remainder: [number, (val: number) => any];
  itemDescRef: RefObject<(HTMLTextAreaElement | null)[]>;
  itemPriceRef: RefObject<(HTMLInputElement | null)[]>;
  remainderRef: RefObject<HTMLInputElement | null>;
  groupData: Group | undefined;
  memberPhotoUrls: Record<string, string | undefined>;
}) => {
  // ------------------------------
  // Local States
  // ------------------------------

  const [toggleFocus, setToggleFocus] = useState<boolean>(false);

  // ------------------------------
  // Effects
  // ------------------------------

  useLayoutEffect(() => {
    itemDescRef.current[itemizedData.length - 1]?.focus();
  }, [toggleFocus]);

  // ------------------------------
  // Event Handlers
  // ------------------------------

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

  const handleRemoveItemClicked = (i: number) => {
    return () => {
      const nextItemizedData = [...itemizedData.slice()];
      nextItemizedData.splice(i, 1);

      setItemizedData(nextItemizedData);
    };
  };

  return (
    <>
      {itemizedData.map((itemizedItem, i) => (
        <div key={i} className="border-ink-400 relative flex flex-col gap-2 border-b border-dashed py-6">
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
              className="field-sizing-content shrink grow resize-none px-1"
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
                          {itemizedItem.payingMembers.has(memberGroupId) ? formatToDigit(`${itemizedSplit}`) : '0.00'}
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
  );
};

export default ItemizedSplit;
