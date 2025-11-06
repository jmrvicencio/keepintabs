import { doc, updateDoc, collection, deleteField, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SplitType } from '@/features/transactions/types';

type GroupUserId = string;

interface SplitData {
  splitType: SplitType;
  splitData: BalancedSplit | ItemizedSplit;
}

// An array of members who are splitting the transaction
interface BalancedSplit {
  payingMembers: Set<GroupUserId>;
}

interface ItemizedSplit {
  entries: {
    description: string;
    amount: number;
    payingMembers: Set<GroupUserId>;
  };
}

// export interface ItemizedEntry {
//   description: string;
//   amount: string;
//   payingMembers: Set<string>; // set of groupUserIds
// }

const useAddTransaction = (groupId: string) => {
  const addNewTransaction = (amount?: number, paidBy?: string, date?: Date, splitData?: SplitData) => {
    const id = uuid();
    const groupRef = doc(db, `${collections.groups}/${groupId}`);
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);

    setDoc(transactionRef, {
      createdAt: serverTimestamp(),
      test: 'test data inputted',
    });

    // setDoc(groupsRef, {
    //     createdAt: serverTimestamp(),
    //     inviteKey,
    //     name: groupName,
    //     memberUids: [userId],
    //     members: {
    //       ...nextMembers,
    //       [userId]: {
    //         displayName: 'Kyle',
    //         linkedUid: userId,
    //       },
    //     },
    //   });
  };

  return addNewTransaction;
};

export default useAddTransaction;
