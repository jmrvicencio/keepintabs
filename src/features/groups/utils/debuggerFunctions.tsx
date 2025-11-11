import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  doc,
  updateDoc,
  getDoc,
  deleteField,
  increment,
  setDoc,
  serverTimestamp,
  DocumentSnapshot,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { useDebug } from '../../../hooks/useDebug';
import { Group } from '../types';

export const useDashboardDebugOptions = (...reloadCallbacks: (() => void)[]) => {
  const { addOption, removeOption } = useDebug();
  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setRefresh((prev) => !prev);
    reloadCallbacks.forEach((callback) => callback());
  };

  const addNewGroup = async () => {
    const groupName = prompt('New Group Name');
    if (groupName === '' || !groupName) {
      return alert('Please enter a name for the group');
    }

    const groupId = uuid();
    const userId = auth.currentUser!.uid;
    const inviteKey = uuid();
    const groups = doc(db, `groups/${groupId}`);
    const groupMembers = doc(db, `groupMembers/${auth.currentUser!.uid}_${groupId}`);
    const groupSettings = doc(db, `groupSettings/${groupId}`);

    setDoc(groupSettings, {
      inviteKey,
    });
    setDoc(groups, {
      createdAt: serverTimestamp(),
      inviteKey,
      name: groupName,
      memberUids: [userId],
      members: {
        [userId]: {
          displayName: 'Kyle',
          linkedUid: userId,
        },
      },
    });
    updateDoc(groups, {
      inviteKey: deleteField(),
    });
    await setDoc(groupMembers, {
      userId,
      groupId,
      inviteKey,
    });
    updateDoc(groupMembers, {
      inviteKey: deleteField(),
    });

    reload();
  };

  useEffect(() => {
    addOption('Add Group', addNewGroup);

    return () => {
      removeOption('Add Group');
    };
  }, []);
};

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
        testUser: {
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
        testUser: {
          testId3214: 0,
          testId1234: 0,
        },
        testId3214: {
          testUser: 150,
          testId1234: 0,
        },
        testId1234: {
          testUser: 200,
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
      [`balance.testUser.testId3214`]: increment(-50),
    });
  };

  const addLendToMarlon = async () => {
    const groupDoc = doc(db, 'groups', groupId!);

    await updateDoc(groupDoc, {
      [`balance.testUser.testId3214`]: increment(50),
    });
  };

  const viewGroupData = async () => {
    const groupRef = doc(db, 'groups', groupId!);
    const groupDoc = await getDoc(groupRef);

    console.log(groupDoc.data());
  };

  useEffect(() => {
    addOption('Add Dummy Data', addDummyData);
    addOption('Clear All Data', clearAllData);
    addOption('Add Debt -> Marlon', addDebtToMarlon);
    addOption('Add Lent -> Marlon', addLendToMarlon);
    addOption('View Group Data', viewGroupData);

    return removeOptions;
  }, []);

  function removeOptions() {
    removeOption('Add Dummy Data');
    removeOption('Clear All Data');
    removeOption('Add Debt -> Marlon');
    removeOption('Add Lent -> Marlon');
    removeOption('View Group Data');
  }

  return removeOptions;
};
