import { doc, updateDoc, collection, deleteField, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';
import { SplitType, Transaction } from '../types';

const useAddTransaction = (groupId: string) => {
  const addNewTransaction = (data: any) => {
    const id = uuid();
    const groupCollection = collection(db, collections.groups);
    const groupRef = doc(groupCollection, groupId);
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);

    setDoc(transactionRef, {
      createdAt: serverTimestamp(),
      ...data,
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
