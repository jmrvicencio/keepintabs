import { useState } from 'react';
import { db, collections } from '@/lib/firebase/firestore';
import { collection, doc, DocumentReference, getDoc } from 'firebase/firestore';
import { Transaction } from '../types';

const useTransaction = async (transactionId: string) => {
  const transactionCollection = collection(db, collections.transactions);
  const transactionRef = doc(transactionCollection, transactionId) as DocumentReference<Transaction>;

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<Transaction>();
  const transactionDoc = await getDoc(transactionRef);

  setTransaction(transactionDoc.data());
  setLoading(false);

  return { transaction, loading };
};

export default useTransaction;
