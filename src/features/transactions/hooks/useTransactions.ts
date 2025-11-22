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

type SortedTransactions = {
  [date: string]: (Transaction & { id: string })[];
};

const pageLimit = 15;

export const useTransactions = (groupUid: string) => {
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
        const nextTransactions = { ...transactions };
        snap.docs.forEach((d) => {
          const month = format(new Date(d.data().date), 'yyyy-MM');

          nextTransactions[month] = nextTransactions[month] ?? [];
          nextTransactions[month].push({
            id: d.id,
            ...deserializeTransaction(d.data()),
          });
        });
        // const results: (Transaction & { id: string })[] = snap.docs.map((d) => ({
        //   id: d.id,
        //   ...deserializeTransaction(d.data()),
        // }));

        if (lastDoc == null && snap.docs.length > 0) setLastDoc(snap.docs.at(-1)!);
        if (snap.docs.length < pageLimit) setEndReached(true);

        if (snap.docs.length == 0) setIsEmpty(true);
        else setIsEmpty(false);

        setLoading(false);
        setTransactions(nextTransactions);
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

  return {
    transactions,
    getPage,
    endReached,
    loading,
    reload,
    isEmpty,
  };
};
