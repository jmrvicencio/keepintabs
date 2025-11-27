import { db, collections } from '@/lib/firebase/firestore';
import { collection, doc, DocumentReference, getDoc } from 'firebase/firestore';
import { Transaction } from '../types';

const useFetchTransaction = (groupId: string, transactionId: string) => async () => {
  const groupCollection = collection(db, collections.groups);
  const groupRef = doc(groupCollection, groupId);
  const transactionCollection = collection(groupRef, collections.transactions);
  const transactionRef = doc(transactionCollection, transactionId) as DocumentReference<Transaction>;
  const transactionSnap = await getDoc(transactionRef);

  return transactionSnap;
};

export default useFetchTransaction;
