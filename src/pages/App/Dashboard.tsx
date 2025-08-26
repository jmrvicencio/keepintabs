import { auth } from '../../firebase/auth';
import { User as UserImage, Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  documentId,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

import logo from '/logo-spaced.svg';
import UserIcon from '../../components/user_stack/UserIcon';
import ProfileIcon from '../../components/ProfileIcon';
import TabGroup from '../../components/TabGroup';
import IconButton from '../../components/buttons/IconButton';
import { showSidebarAtom } from '../../components/sidebar/Sidebar';

function Dashboard() {
  const [groups, setGroups] = useState<DocumentSnapshot[]>([]);
  useEffect(() => {
    async function fetchGroups() {
      const q = query(collection(db, 'groupMembers'), where('userId', '==', auth.currentUser!.uid));
      const groupsMembersSnap = await getDocs(q);
      const groupMembers = [...groupsMembersSnap.docs].map((doc) => ({
        id: doc.id,
        groupId: doc.data().groupId,
      }));

      const groupsSnap = await Promise.all(
        groupMembers.map((groupMembers) => {
          return getDoc(doc(db, `groups/${groupMembers.groupId}`));
        }),
      );

      groupsSnap.forEach((doc) => console.log(doc.data()));
      setGroups(groupsSnap);
    }

    fetchGroups();
  }, []);

  groups.forEach((doc) => console.log('document: ', doc.data()));

  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

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

    setDoc(groups, {
      name: groupName,
      inviteKey,
    });
    setDoc(groupMembers, {
      userId,
      groupId,
      inviteKey,
    });
  };

  return (
    <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
      {showSidebar && <div className="absolute inset-0 h-full w-full bg-black/60" onClick={handleOverlayClicked}></div>}
      <header className="flex flex-row justify-between">
        <div className="flex items-center">
          <img src={logo} className="h-9" />
          <p className="font-outfit text-xl">Keepin' Tabs</p>
        </div>
        <ProfileIcon handleClick={handleProfileClick} />
      </header>
      <main className="flex flex-col items-start gap-8">
        <section className="flex flex-col items-start gap-1">
          <h1 className="font-noto-sans text-sand text-4xl font-medium">Debts Clear!</h1>
          <p>No outstanding balance</p>
        </section>
        <section className="w-full">
          <div className="mb-4 flex flex-row gap-2">
            <p className="font-normal">Groups</p>
            <IconButton>
              <Plus className="w-4" onClick={handleAddGroupClicked} />
            </IconButton>
          </div>
          <div className="flex flex-col gap-2">
            <TabGroup />
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
