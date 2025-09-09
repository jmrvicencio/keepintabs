import { memo, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { doc, updateDoc, setDoc, serverTimestamp, deleteField } from 'firebase/firestore';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useGroups } from '../../../features/groups/hooks/useGroups';

import { ROUTES } from '../../routes';
import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import TabGroup from '../../../features/groups/components/TabGroup';
import SmallButton from '../../../components/buttons/SmallButton';

const Dashboard = memo(function Dashboard() {
  const navigate = useNavigate();
  const { groups, loading, reload: reloadGroups } = useGroups();
  const { groups: loaderGroups, loading: loaderLoading, reload: loaderReload } = useLoaderData();

  console.log('hookData:', groups);
  console.log('hookLoading:', loading);
  console.log('loaderData:', groups);

  const PlusIcon = memo(({ className = 'w-4' }: { className?: string }) => <Plus className={className} />);

  // TODO: Redirect this to an actual page that adds a new group
  const handleAddGroupClicked = async () => {
    // navigate(ROUTES.NEW_GROUP);
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

    reloadGroups();
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
              <SmallButton onClick={handleAddGroupClicked}>
                <PlusIcon />
              </SmallButton>
            </div>
            <div className="flex flex-col gap-2">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="bg-charcoal-500 h-22 w-full animate-pulse cursor-pointer rounded-xl" />
                ))
              ) : (
                <>
                  {groups?.map((doc) => {
                    const docData = doc.data()!;
                    return <TabGroup key={doc.id} id={doc.id} group={docData} />;
                  })}
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
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
});

export default Dashboard;
