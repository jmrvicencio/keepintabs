import { Group } from '@/features/groups/types';
import { collections, db } from '@/lib/firebase/firestore';
import { collection, CollectionReference, doc, DocumentReference, runTransaction } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { SerializedTransaction, SplitData, type Transaction } from '../types';
import { SortedTransactions } from './useTransactions';
import { getMemberSplitTotals } from '../utils/splitUtils';

const useDeleteTransactions = (groupId: string, group: Group) => async (transactions: Record<string, Transaction>) => {
  try {
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId) as DocumentReference<Group>;
    const transactionCollection = collection(
      groupRef,
      collections.transactions,
    ) as CollectionReference<SerializedTransaction>;

    await runTransaction(db, async (transaction) => {
      let nextExpenses = { ...group.expenses };
      let nextSpent = { ...group.spent };

      for (let [txnId, txn] of Object.entries(transactions)) {
        const transactionRef = doc(transactionCollection, txnId);
        const splitTotals = getMemberSplitTotals(txn.amount, txn.splitData, txn.paidBy);
        const lender = txn.paidBy;

        // Remove spent & expenses from the transaction
        nextSpent[lender] = (nextSpent[lender] ?? 0) - txn.amount;

        for (let [borrower, amt] of Object.entries(splitTotals)) {
          nextExpenses[borrower] = (nextExpenses[borrower] ?? 0) - amt;
        }

        transaction.delete(transactionRef);
      }

      transaction.update(groupRef, {
        expenses: nextExpenses,
        spent: nextSpent,
      });
    });
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
  }
};

export default useDeleteTransactions;
