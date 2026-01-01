import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  doc,
  updateDoc,
  getDoc,
  deleteField,
  deleteDoc,
  increment,
  setDoc,
  serverTimestamp,
  DocumentSnapshot,
  DocumentReference,
  getDocs,
  query,
  collection,
  runTransaction,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { collections, db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { useDebug } from '../../../hooks/useDebug';
import { Group } from '../types';
import { SplitType, Transaction } from '@/features/transactions/types';
import { ItemizedEntry } from '@/features/new-transaction/components/SplitTransaction';
import useAddTransaction from '@/features/transactions/hooks/useAddTransaction';
import { getMemberSplitTotals } from '@/features/transactions/utils/splitUtils';
import { serializeTransaction } from '@/features/transactions/utils/serializer';

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

const dummyTransaction: Transaction = {
  amount: 40000,
  description: 'dummy transaction',
  paidBy: 'testUser',
  splits: 4,
  date: Date.now(),
  splitData: {
    type: 'balanced',
    data: {
      payingMembers: new Set(Object.keys(dummyGroup.members)),
    },
  },
};

export const useGroupDebugOptions = () => {
  const { group: groupId } = useParams();
  const { addOption, removeOption } = useDebug();
  const addTransaction = useAddTransaction(groupId!);

  const addDummyData = async () => {
    const groupDoc = doc(db, 'groups', groupId!);
    const docData = await getDoc(groupDoc);
    const memberUids = docData.data()?.memberUids;

    const data = dummyGroup;
    data.memberUids = [...memberUids];
    data.members['testUser'] = {
      ...data.members['testUser'],
      linkedUid: auth.currentUser!.uid,
      email: auth.currentUser!.email!,
    };
    const splitTotals = getMemberSplitTotals(
      dummyTransaction.amount,
      dummyTransaction.splitData,
      dummyTransaction.paidBy,
    );

    await updateDoc(groupDoc, { ...data });
    let nextGroup = { ...data };
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
  };

  const clearAllData = async () => {
    const groupRef = doc(db, 'groups', groupId!);
    const transactionCollection = collection(groupRef, collections.transactions);
    const q = query(transactionCollection);

    const transactions = await getDocs(q);

    await runTransaction(db, async (transaction) => {
      transactions.docs.forEach((d) => {
        const transactionRef = doc(transactionCollection, d.id);
        transaction.delete(transactionRef);
      });

      await transaction.update(groupRef, {
        expenses: [],
        spent: [],
      });
    });
  };

  const viewGroupData = async () => {
    const groupRef = doc(db, 'groups', groupId!);
    const groupDoc = await getDoc(groupRef);

    console.log(groupDoc.data());
  };

  const add5Transactions = async () => {
    const groupRef = doc(db, collections.groups, groupId!) as DocumentReference<Group>;
    const groupSnap = await getDoc(groupRef);
    const splitTotals = getMemberSplitTotals(
      dummyTransaction.amount,
      dummyTransaction.splitData,
      dummyTransaction.paidBy,
    );

    let nextGroup = groupSnap.data()!;
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
  };

  const add1Transaction = async () => {
    const groupRef = doc(db, collections.groups, groupId!) as DocumentReference<Group>;
    const groupSnap = await getDoc(groupRef);
    const splitTotals = getMemberSplitTotals(
      dummyTransaction.amount,
      dummyTransaction.splitData,
      dummyTransaction.paidBy,
    );

    let nextGroup = groupSnap.data()!;
    nextGroup = await addTransaction(serializeTransaction(dummyTransaction), splitTotals, nextGroup);
  };

  useEffect(() => {
    addOption('Add Dummy Data', addDummyData);
    addOption('Clear All Data', clearAllData);
    addOption('View Group Data', viewGroupData);
    addOption('Add 5 Transactions', add5Transactions);
    addOption('Add 1 Transaction', add1Transaction);

    return removeOptions;
  }, []);

  function removeOptions() {
    removeOption('Add Dummy Data');
    removeOption('Clear All Data');
    removeOption('View Group Data');
    removeOption('Add 5 Transactions');
    removeOption('Add 1 Transaction');
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
