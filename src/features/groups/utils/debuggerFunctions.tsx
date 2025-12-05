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
import { SplitType } from '@/features/transactions/types';
import { ItemizedEntry } from '@/features/new-transaction/components/SplitTransaction';

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

const dummyGroup: Group = {
  name: 'CWDB',
  memberUids: [],
  members: {
    testUser: {
      displayName: 'Kyle',
      photoUrl: 'https://i.pinimg.com/1200x/97/47/02/9747029215bbd5677b8114e43b7c9589.jpg',
    },
    testIdA: {
      displayName: 'Julian',
      photoUrl: 'https://i.pinimg.com/736x/a2/a6/e1/a2a6e13821ad970f0790054db790cff1.jpg',
    },
    testIdB: {
      displayName: 'Marlon',
      photoUrl: 'https://i.pinimg.com/736x/f8/23/31/f82331683e3c17da6b6498475d3c1888.jpg',
    },
    testIdC: {
      displayName: 'Jayni',
      photoUrl: 'https://i.pinimg.com/736x/1c/4b/c4/1c4bc411f32787cdef1490f396089225.jpg',
    },
  },
  expenses: {},
  spent: {},
};

export const useGroupDebugOptions = () => {
  const { group: groupId } = useParams();
  const { addOption, removeOption } = useDebug();

  const addDummyData = async () => {
    const groupDoc = doc(db, 'groups', groupId!);
    const docData = await getDoc(groupDoc);
    const memberUids = docData.data()?.memberUids;

    const data = dummyGroup;
    data.memberUids = [...memberUids];
    data.members['testUser'].linkedUid = auth.currentUser!.uid;

    await updateDoc(groupDoc, { ...data });
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
      [`balance.testUser.testIdB`]: increment(-50),
    });
  };

  const addLendToMarlon = async () => {
    const groupDoc = doc(db, 'groups', groupId!);

    await updateDoc(groupDoc, {
      [`balance.testUser.testIdB`]: increment(50),
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

export function useNewTransactionDebugOptions({
  setSplitType,
  setItemizedData,
}: {
  setSplitType: (val: SplitType) => any;
  setItemizedData: (val: ItemizedEntry[]) => any;
}) {
  const { addOption, removeOption } = useDebug();

  const createItemizedData = () => {
    const itemizedData: ItemizedEntry[] = [
      {
        amount: 8000,
        description: 'Dumplings',
        payingMembers: new Set(['testUser', 'testIdA', 'testIdB', 'testIdC']),
      },
      {
        amount: 19000,
        description: 'Chicken Teriyaki',
        payingMembers: new Set(['testUser', 'testIdC']),
      },
      {
        amount: 21000,
        description: 'Kuro Ramen',
        payingMembers: new Set(['testIdA']),
      },
      {
        amount: 20000,
        description: 'Shiro Ramen',
        payingMembers: new Set(['testIdB']),
      },
    ];

    setSplitType('itemized');
    console.log('test');
    setItemizedData(itemizedData);
  };

  useEffect(() => {
    addOption('Create Itemized Data', createItemizedData);

    return () => {
      removeOption('Create Itemized Data');
    };
  }, []);
}
