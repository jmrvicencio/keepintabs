import { doc, collection, serverTimestamp, runTransaction, DocumentReference } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SerializedTransaction, SplitTotal } from '../types';
import { Group } from '@/features/groups/types';

const useAddTransaction =
  (groupId: string) =>
  async (data: SerializedTransaction, splitTotal: SplitTotal, group: Group): Promise<Group> => {
    const id = uuid();
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId) as DocumentReference<Group>;
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);
    const nextExpenses = { ...group.expenses };
    const nextSpent = { ...group.spent };
    const lender = data.paidBy;

    nextSpent[lender] = (nextSpent[lender] ?? 0) + data.amount; // Add amt spent by member

    for (let [borrower, amt] of Object.entries(splitTotal)) {
      nextExpenses[borrower] = (nextExpenses[borrower] ?? 0) + amt; // Add expense of member
    }

    await runTransaction(db, async (transaction) => {
      transaction.set(transactionRef, {
        createdAt: serverTimestamp(),
        ...data,
      });
      transaction.update(groupRef, {
        expenses: nextExpenses,
        spent: nextSpent,
      });
    });

    return { ...group, expenses: nextExpenses, spent: nextSpent };
  };

export default useAddTransaction;
