import { auth } from '../../firebase/auth';
import { User as UserImage, Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDocsFromCache,
  query,
  where,
  getDoc,
  documentId,
  serverTimestamp,
  type DocumentSnapshot,
  type QuerySnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

import TabGroup from '../../components/TabGroup';
import IconButton from '../../components/buttons/IconButton';
import Header from '../../components/Header';
import { showSidebarAtom } from '../../components/sidebar/Sidebar';
import { dataFetchedAtom } from '../App';

function Dashboard() {
  const [groups, setGroups] = useState<DocumentSnapshot[]>([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [dataFetched, setDataFetched] = useAtom(dataFetchedAtom);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  // Fetch all groups to display on dashboard
  useEffect(() => {
    async function fetchGroups() {
      try {
        const q = query(
          collection(db, 'groups'),
          where('members', 'array-contains', auth.currentUser!.uid),
          orderBy('createdAt'),
        );
        let groupsSnap: QuerySnapshot;

        if (dataFetched) {
          groupsSnap = await getDocsFromCache(q);
        } else {
          groupsSnap = await getDocs(q);
          setDataFetched(true);
        }

        // groupsSnap.forEach((doc) => console.log('from cache: ', doc.metadata.fromCache));
        // groupsSnap.forEach((doc) => console.log('data: ', doc.data()));
        setGroups(groupsSnap.docs);
      } catch (err) {
        throw err;
      }
    }

    fetchGroups();
  }, [toggleFetch]);

  const handleOverlayClicked = () => {
    setShowSidebar(false);
  };

  const handleAddGroupClicked = () => {
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
      members: [userId],
    });
    setDoc(groupMembers, {
      userId,
      groupId,
      inviteKey,
    });

    setToggleFetch(!toggleFetch);
  };

  return (
    <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
      {showSidebar && <div className="absolute inset-0 h-full w-full bg-black/60" onClick={handleOverlayClicked}></div>}
      <Header />
      <main className="flex flex-col items-start gap-8">
        <section className="flex flex-col items-start gap-1">
          <h1 className="font-noto-sans text-sand text-4xl font-medium">Debts Clear!</h1>
          <p>No outstanding balance</p>
        </section>
        <section className="w-full">
          <div className="mb-4 flex flex-row gap-2">
            <p className="font-normal">Groups</p>
            <IconButton onClick={handleAddGroupClicked}>
              <Plus className="w-4" />
            </IconButton>
          </div>
          <div className="flex flex-col gap-2">
            {groups.map((doc) => (
              <TabGroup key={doc.id} name={doc.data()!.name} id={doc.id} />
            ))}
            {/* <TabGroup name="CWDB" /> */}
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
  );
}

export default Dashboard;
