import { doc, collection, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SerializedTransaction, SplitTotal } from '../types';
import { Group } from '@/features/groups/types';

const useAddTransaction = (groupId: string, group: Group) => {
  const addNewTransaction = async (data: SerializedTransaction, splitTotal: SplitTotal) => {
    const id = uuid();
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId);
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);
    const nextBalance = { ...group.balance };
    const lender = data.paidBy;

    if (!nextBalance[lender]) nextBalance[lender] = {};

    for (let [lent, amt] of Object.entries(splitTotal)) {
      if (lent === lender) continue;

      nextBalance[lender][lent] = (nextBalance[lender][lent] ?? 0) + amt;
    }

    await runTransaction(db, async (transaction) => {
      transaction.set(transactionRef, {
        createdAt: serverTimestamp(),
        ...data,
      });
      transaction.update(groupRef, {
        balance: nextBalance,
      });
    });
  };

  return addNewTransaction;
};

export default useAddTransaction;
