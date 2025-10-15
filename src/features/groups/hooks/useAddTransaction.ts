import { doc, updateDoc, collection, deleteField, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, collections } from '../../../lib/firebase/firestore';

const useAddTransaction = (groupId: string) => {
  const addNewTransaction = () => {
    const id = uuid();
    const groupRef = doc(db, `${collections.groups}/${groupId}`);
    const transactionCollection = collection(groupRef, collections.transactions);
    const transactionRef = doc(transactionCollection, id);

    console.log('adding document');

    setDoc(transactionRef, {
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
