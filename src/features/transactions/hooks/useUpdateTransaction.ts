import { Group } from '@/features/groups/types';
import { collection, doc, DocumentReference, runTransaction } from 'firebase/firestore';
import { SerializedTransaction, Transaction, SplitTotal } from '../types';
import { collections, db } from '@/lib/firebase/firestore';
import { getMemberSplitTotals } from '../utils/splitUtils';

const useUpdateTransaction =
  (groupId: string, transactionId: string, group: Group, prevTransaction: Transaction) =>
  async (data: SerializedTransaction, splitTotal: SplitTotal) => {
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId) as DocumentReference<Group>;
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, transactionId) as DocumentReference<SerializedTransaction>;

    const nextBalance = { ...group.balance };
    const lender = data.paidBy;

    if (!nextBalance[lender]) nextBalance[lender] = {};

    // Remove balance from previous transaction
    const prevLender = prevTransaction.paidBy;
    const prevSplitTotal = getMemberSplitTotals(prevTransaction.amount, prevTransaction.splitData);

    for (let [lentTo, amt] of Object.entries(prevSplitTotal)) {
      if (lentTo === prevLender) continue;

      nextBalance[lender][lentTo] = (nextBalance[lender][lentTo] ?? 0) - amt;
    }

    // Add balance from current transaction
    for (let [lentTo, amt] of Object.entries(splitTotal)) {
      if (lentTo === lender) continue;

      nextBalance[lender][lentTo] = (nextBalance[lender][lentTo] ?? 0) + amt;
    }

    console.log('new balance ', nextBalance);

    await runTransaction(db, async (transaction) => {
      transaction.update(transactionRef, { ...data });
      transaction.update(groupRef, {
        balance: nextBalance,
      });
    });
  };

export default useUpdateTransaction;
