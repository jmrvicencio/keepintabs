import {
  useState,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type ChangeEvent,
  ForwardedRef,
} from 'react';
import { type DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';
import { formattedStrToNum } from '@/util/helpers';
import ItemizedSplit from './ItemizedSplit';
import BalancedSplit from './BalancedSplit';

import { UserIcon } from 'lucide-react';
import { Group } from '@/features/groups/types';
import {
  type SplitType,
  SplitData,
  SplitRef,
  BalancedSplit as BalancedSplitType,
  ItemizedSplit as ItemizedSplitType,
} from '@/features/transactions/types';
import { set } from 'date-fns';

export interface ItemizedEntry {
  description: string;
  amount: number;
  payingMembers: Set<string>; // set of groupUserIds
  error?: 'Must have atleast 1 paying member';
}

export interface BalancedData {
  payingMembers: Set<string>;
  error?: 'Must have atleast 1 paying member';
}

/**
 * Split Transaction Component
 *
 * Renders a transaction split interface to set the type of split and the division details.
 *
 * @param {SplitType} splitType - The string name for the type of split to use
 * @param {string} total - The state used for the string representation of the total.
 */
const SplitTransactionPage = forwardRef(
  (
    {
      splitType: initialSplitType,
      total: [total, setTotal],
      currGroup,
      memberPhotoUrls,
      splitData,
    }: {
      splitType: SplitType;
      total: [string, (val: string) => any];
      currGroup?: DocumentSnapshot<Group, DocumentData>;
      memberPhotoUrls: Record<string, string | undefined>;
      splitData: SplitData;
    },
    ref: ForwardedRef<SplitRef>,
  ) => {
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

    const [splitType, setSplitType] = useState<SplitType>(initialSplitType);
    const [localTotal, setLocalTotal] = useState(total); // Local total to use for the split
    const [remainder, setRemainder] = useState(0);
    const [itemizedData, setItemizedData] = useState<ItemizedEntry[]>(
      splitData.type == 'itemized' //
        ? splitData.data.entries
        : [],
    );
    const [balancedData, setBalancedData] = useState<BalancedData>(
      splitData.type == 'balanced'
        ? splitData.data
        : { payingMembers: new Set([...Object.keys(currGroup?.data()?.members ?? {})]) },
    );

    // ------------------------------
    // Computed Variables
    // ------------------------------

    const itemizedPrices = (itemizedData ?? []).map((item) => item.amount).join('|');
    const itemizedTotal = useMemo(() => {
      return (itemizedData ?? []).reduce((acc, item) => Math.floor(acc + item.amount), 0);
    }, [itemizedPrices]);
    const splitTotalNum = Number(localTotal);
    const groupData = currGroup?.data();
    const setBalancedDataWrapper = (val: Set<string>) => {
      const { payingMembers: _, ...cleaned } = balancedData;
      const nextBalancedData = {
        payingMembers: val,
        ...cleaned,
      };

      setBalancedData(nextBalancedData);
    };

    // ------------------------------
    // Effects
    // ------------------------------

    useEffect(() => {
      if (isFirstRender.current == true) {
        isFirstRender.current = false;
        return;
      }

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

    // ------------------------------
    // Imperative Handle for Ref
    // ------------------------------

    useImperativeHandle(ref, () => ({
      //f Check that all splits have a paying Member
      verifySplits: () => {
        let errorFound = false;

        if (splitType == 'itemized') {
          const nextItemizedData = [...itemizedData];

          for (let [i, entry] of itemizedData.entries()) {
            if (entry.payingMembers.size == 0) {
              errorFound = true;
              const nextItemizedEntry = { ...nextItemizedData[i] };
              nextItemizedEntry.error = 'Must have atleast 1 paying member';
              nextItemizedData[i] = nextItemizedEntry;
            }
          }

          if (errorFound) setItemizedData(nextItemizedData);
        } else {
          if (balancedData.payingMembers.size == 0) {
            const nextBalancedData = { ...balancedData };

            errorFound = true;
            nextBalancedData.error = 'Must have atleast 1 paying member';
            setBalancedData(nextBalancedData);
          }
        }

        return !errorFound;
      },
      getData: () => {
        const splitData: SplitData =
          splitType == 'itemized'
            ? {
                type: 'itemized',
                data: {
                  remainder,
                  entries: itemizedData,
                },
              }
            : {
                type: 'balanced',
                data: {
                  payingMembers: balancedData.payingMembers,
                },
              };

        return {
          amount: formattedStrToNum(localTotal),
          splitData,
        };
      },
    }));

    // ------------------------------
    // Event Handlers
    // ------------------------------

    const handleSplitTypeClicked = (val: SplitType) => () => {
      setSplitType(val);

      if (val == 'itemized') {
        const localTotalNum = formattedStrToNum(localTotal);

        if (localTotalNum < itemizedTotal) {
          setLocalTotal(formatToDigit(itemizedTotal));
          setRemainder(0);
        } else {
          setLocalTotal(formatToDigit(localTotalNum));
          setRemainder(localTotalNum - itemizedTotal);
        }
      }
    };

    const handleLocalTotalChanged = (e: ChangeEvent<HTMLInputElement>) => {
      let nextVal: string = e.currentTarget.value ?? '';

      // field cant be empty so we need to put a placeholder of 0.00
      if (nextVal.length <= 0) nextVal = '0.00';
      const isOnlyDigits = /^(\d|\,|\.)+$/.test(nextVal);
      if (!isOnlyDigits) return;

      const formattedVal = formatToDigit(nextVal);
      let nextValNumber = Number(formattedVal.replaceAll(',', '').replaceAll('.', ''));

      if (splitType == 'itemized') {
        if (nextValNumber >= itemizedTotal) {
          setLocalTotal(formattedVal);
        } else {
          setLocalTotal(formatToDigit(`${itemizedTotal}`));
        }
        const nextRemainder = Math.floor(nextValNumber - itemizedTotal);
        setRemainder(nextRemainder);
      } else if (splitType == 'balanced') {
        setLocalTotal(formattedVal);
      }
    };

    // ------------------------------
    // Component Render
    // ------------------------------

    return (
      <div className="px-2 outline-none">
        <div className="m-auto max-w-120 border border-black bg-white p-6">
          <div className="border-ink-400 relative flex flex-col border-b border-dashed py-6">
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
            <div className="flex flex-row items-end justify-center">
              <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
                Total Amount
              </label>
              <p className="font-bold">(PHP)</p>
            </div>
          </div>
          <div className="border-ink-400 gap:2 relative flex flex-col border-b border-dashed py-6">
            <h2 className="font-gieonto text-4xl">Split Type</h2>
            <div className="flex flex-row justify-center gap-2 py-4">
              <input
                type="button"
                value="Balanced"
                className={`${splitType == 'balanced' && 'selected'} border-ink-400 cursor-pointer rounded-md border px-3 py-0.5 [.selected]:bg-black [.selected]:text-white`}
                onClick={handleSplitTypeClicked('balanced')}
              />
              <input
                type="button"
                value="Itemized"
                className={`${splitType == 'itemized' && 'selected'} border-ink-400 cursor-pointer rounded-md border px-3 py-0.5 [.selected]:bg-black [.selected]:text-white`}
                onClick={handleSplitTypeClicked('itemized')}
              />
            </div>
          </div>
          {splitType == 'itemized' ? (
            <ItemizedSplit
              itemizedData={[itemizedData, setItemizedData]}
              remainder={[remainder, setRemainder]}
              itemDescRef={itemDescRef}
              itemPriceRef={itemPriceRef}
              remainderRef={remainderRef}
              groupData={groupData}
              memberPhotoUrls={memberPhotoUrls}
            />
          ) : (
            <BalancedSplit
              localTotal={localTotal}
              balancedData={[balancedData, setBalancedData]}
              groupData={groupData}
              memberPhotoUrls={memberPhotoUrls}
            />
          )}
        </div>
      </div>
    );
  },
);

export default SplitTransactionPage;
