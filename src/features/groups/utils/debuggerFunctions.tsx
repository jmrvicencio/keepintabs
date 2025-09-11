import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc, deleteField, increment } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { useDebug } from '../../../hooks/useDebug';

export const useGroupDebugOptions = () => {
  const { group: groupId } = useParams();
  const { addOption, removeOption } = useDebug();

  const addDummyData = async () => {
    const groupDoc = doc(db, 'groups', groupId!);
    const docData = await getDoc(groupDoc);
    const memberUids = docData.data()?.memberUids;

    const data = {
      memberUids: [...memberUids],
      members: {
        [auth.currentUser!.uid]: {
          displayName: 'Kyle',
          linkedUid: auth.currentUser!.uid,
        },
        testId1234: {
          displayName: 'Julian',
        },
        testId3214: {
          displayName: 'Marlon',
        },
        testIdabd: {
          displayName: 'Jayni',
        },
      },
      balance: {
        [auth.currentUser!.uid]: {
          testId3214: 0,
          testId1234: 0,
        },
        testId3214: {
          [auth.currentUser!.uid]: 150,
          testId1234: 0,
        },
        testId1234: {
          [auth.currentUser!.uid]: 200,
          testId3214: 50,
        },
        testIdabd: {
          testId1234: 100,
        },
      },
    };

    await updateDoc(groupDoc, data);
  };

  const clearAllData = async () => {
    const groupDoc = doc(db, 'groups', groupId!);

    await updateDoc(groupDoc, {
      balance: deleteField(),
    });
  };

  const addDebtToMarlon = async () => {
    const groupDoc = doc(db, 'groups', groupId!);

    await updateDoc(groupDoc, {
      [`balance.${auth.currentUser!.uid}.testId3214`]: increment(-50),
    });
  };
  const addLendToMarlon = async () => {
    const groupDoc = doc(db, 'groups', groupId!);

    await updateDoc(groupDoc, {
      [`balance.${auth.currentUser!.uid}.testId3214`]: increment(50),
    });
  };

  useEffect(() => {
    addOption('Add Dummy Data', addDummyData);
    addOption('Clear All Data', clearAllData);
    addOption('Add Debt -> Marlon', addDebtToMarlon);
    addOption('Add Lent -> Marlon', addLendToMarlon);

    return () => {
      removeOption('Add Dummy Data');
      removeOption('Clear All Data');
      removeOption('Add Debt -> Marlon');
      removeOption('Add Lent -> Marlon');
    };
  }, []);
};
