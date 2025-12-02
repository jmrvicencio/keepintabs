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
    const nextExpenses = { ...group.expenses };
    const nextSpent = { ...group.spent };
    const lender = data.paidBy;

    if (!nextBalance[lender]) nextBalance[lender] = {};

    // Remove balance from previous transaction
    const prevLender = prevTransaction.paidBy;
    const prevSplitTotal = getMemberSplitTotals(prevTransaction.amount, prevTransaction.splitData);
    nextSpent[lender] = (nextSpent[lender] ?? 0) - prevTransaction.amount;

    for (let [borrower, amt] of Object.entries(prevSplitTotal)) {
      nextExpenses[borrower] = (nextExpenses[borrower] ?? 0) - amt; // Remove expenses from previous transaction

      if (borrower === prevLender) continue;

      nextBalance[prevLender][borrower] = (nextBalance[prevLender][borrower] ?? 0) - amt;
    }

    // Add balance from current transaction
    nextSpent[lender] = (nextSpent[lender] ?? 0) + data.amount;

    for (let [borrower, amt] of Object.entries(splitTotal)) {
      nextExpenses[borrower] = (nextExpenses[borrower] ?? 0) + amt;

      if (borrower === lender) continue;

      nextBalance[lender][borrower] = (nextBalance[lender][borrower] ?? 0) + amt;
    }

    await runTransaction(db, async (transaction) => {
      transaction.update(transactionRef, { ...data });
      transaction.update(groupRef, {
        balance: nextBalance,
        expenses: nextExpenses,
        spent: nextSpent,
      });
    });
  };

export default useUpdateTransaction;
