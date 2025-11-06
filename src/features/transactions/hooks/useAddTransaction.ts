import { doc, updateDoc, collection, deleteField, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SplitType, Transaction } from '../types';

const useAddTransaction = (groupId: string) => {
  const addNewTransaction = (data: Transaction) => {
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
