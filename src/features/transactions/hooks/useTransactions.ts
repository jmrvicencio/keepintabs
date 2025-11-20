import { useEffect, useState } from 'react';
import { collection, DocumentReference, getDocs, onSnapshot, orderBy, query, limit } from 'firebase/firestore';
import { deserializeTransaction } from '../utils/serializer';

import { DocumentSnapshot } from 'firebase/firestore';
import { SerializedTransaction, Transaction } from '../types';
import { collections, db } from '@/lib/firebase/firestore';

type TransactionPages = {
  [page: number]: (Transaction & { id: string })[];
};

const pageLimit = 15;

export const useTransacations = (groupUid: string) => {
  const [transactions, setTransactions] = useState<TransactionPages>({});
  const [page, setPage] = useState(0);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // --------------------------
  // Effects
  // --------------------------

  useEffect(() => {
    const transactionCollection = collection(db, collections.groups, groupUid, collections.transactions);
    const q = query(transactionCollection, orderBy('date', 'desc'), limit(pageLimit));

    const unsubscribe = onSnapshot(q, (snap) => {
      const results: (Transaction & { id: string })[] = snap.docs.map((d) => ({
        id: d.id,
        ...deserializeTransaction(d.data() as SerializedTransaction),
      }));

      if (lastDoc == null && snap.docs.length > 0) setLastDoc(snap.docs.at(-1)!);
      if (snap.docs.length < pageLimit) setEndReached(true);
      if (snap.docs.length == 0) setIsEmpty(true);

      setLoading(false);
      setTransactions((prev) => ({ ...prev, 0: results }));
    });

    return unsubscribe;
  }, [refetch]);

  // --------------------------
  // Methods
  // --------------------------

  const getPage = async () => {
    if (endReached) return;
    const transactionCollection = collection(db, collections.groups, groupUid, collections.transactions);
    const q = query(transactionCollection, orderBy('date', 'desc'), limit(pageLimit));
    const nextPage = page + 1;

    const snaps = await getDocs(q);
    const results = snaps.docs.map((d) => ({
      id: d.id,
      ...deserializeTransaction(d.data() as SerializedTransaction),
    }));
    const nextTransactions = {
      ...transactions,
      [nextPage]: results,
    };

    setTransactions(nextTransactions);
    setPage(nextPage);
  };

  const reload = () => {
    setPage(0);
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
