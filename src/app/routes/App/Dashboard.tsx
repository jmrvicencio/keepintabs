import { useEffect, useState, memo, useMemo, useCallback } from 'react';
import { auth } from '../../../lib/firebase/auth';
import { User as UserImage, Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  getDocsFromCache,
  query,
  where,
  serverTimestamp,
  deleteField,
  type DocumentSnapshot,
  type QuerySnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase/firestore';
import { v4 as uuid } from 'uuid';

import TabGroup from '../../../components/app/TabGroup';
import IconButton from '../../../components/buttons/IconButton';
import { dataFetchedAtom } from './App';

function Dashboard() {
  const [groups, setGroups] = useState<DocumentSnapshot[]>([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [dataFetched, setDataFetched] = useAtom(dataFetchedAtom);

  // Fetch all groups to display on dashboard
  useEffect(() => {
    async function fetchGroups() {
      try {
        const q = query(
          collection(db, 'groups'),
          where('memberUids', 'array-contains', auth.currentUser!.uid),
          orderBy('createdAt'),
        );
        let groupsSnap: QuerySnapshot;

        if (dataFetched) {
          groupsSnap = await getDocsFromCache(q);
        } else {
          groupsSnap = await getDocs(q);
          setDataFetched(true);
        }

        setGroups(groupsSnap.docs);
      } catch (err) {
        throw err;
      }
    }

    fetchGroups();
  }, [toggleFetch]);

  const IconButtonMemo = memo(() => {
    return (
      <IconButton onClick={handleAddGroupClicked}>
        <Plus className="w-4" />
      </IconButton>
    );
  });

  const tabGroups = useMemo(() => {
    return groups.map((doc) => {
      const docData = doc.data();
      return <TabGroup key={doc.id} id={doc.id} name={docData!.name} />;
    });
  }, [groups]);

  const handleAddGroupClicked = async () => {
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

    setToggleFetch((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
        <main className="flex flex-col items-start gap-8">
          <section className="flex flex-col items-start gap-3">
            <h1 className="font-noto-sans text-sand text-left text-4xl font-medium">Debts Clear!</h1>
            <p className="text-xl font-light">No outstanding balance</p>
          </section>
          <section className="w-full">
            <div className="mb-4 flex flex-row gap-2">
              <p className="font-normal">Groups</p>
              <IconButtonMemo />
            </div>
            <div className="flex flex-col gap-2">
              {tabGroups}
              <div className="border-charcoal-700 flex w-full cursor-pointer flex-col gap-2 rounded-xl border-1 p-1">
                <div className="text-sand flex flex-row items-center justify-between px-2">
                  <p className="font-medium">Non Grouped Expenses</p>
                </div>
                <div className="bg-charcoal-500 flex w-full flex-row justify-between gap-2 rounded-lg p-2">
                  <div className="bg-accent-200 w-2 rounded-xs" />
                  <p className="grow-1 text-left">You Owe</p>
                  <p className="font-noto-sans text-accent-200">PHP 4,260.00</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
