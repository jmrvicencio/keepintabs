import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  limit,
  startAfter,
  CollectionReference,
} from 'firebase/firestore';
import { deserializeTransaction } from '../utils/serializer';
import { format } from 'date-fns';

import { ROUTES } from '@/app/routes';
import { DocumentSnapshot } from 'firebase/firestore';
import { SerializedTransaction, Transaction } from '../types';
import { collections, db } from '@/lib/firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { id } from 'date-fns/locale';

type TransactionItem = Transaction & { id: string };
export type SortedTransactions = {
  [date: string]: TransactionItem[];
};

const pageLimit = 15;

/**
 * performs a binary search on the date parameter of a transactionItem array.
 *
 * @param arr array of TransactionItems to search through
 * @param target target transactionItem
 * @param {boolean} indexBefore if true, will get the index of the start of the insertion order for the given transaction date.
 * @returns insertion index based on the item
 */
function bSearch(arr: TransactionItem[], target: TransactionItem, indexBefore: boolean = false): number {
  if (arr.length === 0) return 0;

  let start = 0;
  let end = Math.max(arr.length - 1, 0);
  let curr;

  while (start <= end) {
    curr = Math.floor((start + end) / 2);
    const item = arr[curr];

    if (start === end && item.date === target.date) {
      return curr!;
    } else if ((indexBefore && item.date > target.date) || (!indexBefore && item.date >= target.date)) {
      start = curr + 1;
    } else {
      end = curr - 1;
    }
  }

  return start === curr! ? curr! : curr! + 1;
}

/**
 * Searches through an array to find if an item is in the given array, and finds the insertion index to place
 * a the item into the array to keep the order of the array.
 *
 * @param arr array of TransactionItems to search through
 * @param target Transaction Item to search for.
 * @returns {[number, boolean]} a tuple of the insertion index for a given target transaction date, and a boolean if
 * the transaction was found in the array.
 */
function findTransaction(arr: TransactionItem[], target: TransactionItem): [number, number] {
  const start = bSearch(arr, target, true);
  const end = bSearch(arr, target);
  const itemRange = arr.slice(start, end + 1);
  let match = -1;

  itemRange.forEach((item, i) => {
    if (match >= 0) return;
    else if (item.id === target.id) match = start + i;
  });

  return [start, match];
}

const useTransactions = (groupUid: string) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<SortedTransactions>({});
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // --------------------------
  // Effects
  // --------------------------

  useEffect(() => {
    const transactionCollection = collection(
      db,
      collections.groups,
      groupUid,
      collections.transactions,
    ) as CollectionReference<SerializedTransaction>;
    const q = query(transactionCollection, orderBy('date', 'desc'), limit(pageLimit));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setTransactions((prevTransactions) => {
          const nextTransactions = { ...prevTransactions };

          snap.docs.forEach((d) => {
            const txn = { id: d.id, ...deserializeTransaction(d.data()!) };
            const month = format(new Date(d.data().date), 'yyyy-MM');

            nextTransactions[month] = nextTransactions[month] ?? [];

            const [insertIndex, matchIndex] = findTransaction(nextTransactions[month], txn);

            if (matchIndex > -1) {
              nextTransactions[month][matchIndex] = txn;
              return;
            }
            nextTransactions[month].splice(insertIndex, 0, txn);
          });

          return nextTransactions;
        });

        if (lastDoc == null && snap.docs.length > 0) setLastDoc(snap.docs.at(-1)!);
        if (snap.docs.length < pageLimit) setEndReached(true);

        if (snap.docs.length == 0) setIsEmpty(true);
        else setIsEmpty(false);

        setLoading(false);
      },
      (err) => {
        const error = err as Error;

        unsubscribe();
        toast.error(error.message);
        console.error(error);
        navigate(ROUTES.APP);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [refetch]);

  // --------------------------
  // Methods
  // --------------------------

  /**
   * A method to ge the next page of transactions since transactions are paginated.
   */
  const getPage = async () => {
    if (endReached) return;
    const transactionCollection = collection(
      db,
      collections.groups,
      groupUid,
      collections.transactions,
    ) as CollectionReference<SerializedTransaction>;
    const q = query(transactionCollection, orderBy('date', 'desc'), limit(pageLimit), startAfter(lastDoc));
    const nextTransactions = { ...transactions };

    const snaps = await getDocs(q);
    snaps.docs.forEach((d) => {
      const month = format(new Date(d.data().date), 'yyyy-MM');

      nextTransactions[month] = nextTransactions[month] ?? [];
      nextTransactions[month].push({
        id: d.id,
        ...deserializeTransaction(d.data()),
      });
    });

    setTransactions(nextTransactions);
  };

  const reload = () => {
    setLastDoc(null);
    setTransactions({});
    setRefetch((prev) => !prev);
  };

  const removeTransactions = (txns: { [id: string]: Transaction }) => {
    const nextTransactions = { ...transactions };

    for (let [id, txn] of Object.entries(txns)) {
      const month = format(new Date(txn.date), 'yyyy-MM');
      const nextMonth = nextTransactions[month].filter((val) => val.id != id);

      nextTransactions[month] = nextMonth;
    }

    setTransactions(nextTransactions);
  };

  return {
    transactions,
    getPage,
    endReached,
    loading,
    reload,
    isEmpty,
    removeTransactions,
  };
};

export default useTransactions;
