import { doc, collection, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SerializedTransaction } from '../types';
import { Group } from '@/features/groups/types';

const useAddTransaction = (groupId: string, group: Group) => {
  const addNewTransaction = async (data: SerializedTransaction) => {
    const id = uuid();
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId);
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);
    const nextBalance = { ...group.balance };
    const lender = data.paidBy;

    if (!nextBalance[lender]) nextBalance[lender] = {};

    if (data.splitData.type == 'balanced') {
      const payingMembers = data.splitData.data.payingMembers;
      const splitAmt = Math.floor(data.amount / payingMembers.length);

      for (let lent of payingMembers) {
        nextBalance[lender][lent] = (nextBalance[lender][lent] ?? 0) + splitAmt;
      }
    } else {
      const payingMembers = data.splitData.data.totals;

      for (let [lent, amt] of Object.entries(payingMembers)) {
        nextBalance[lender][lent] = (nextBalance[lender][lent] ?? 0) + amt;
      }
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
