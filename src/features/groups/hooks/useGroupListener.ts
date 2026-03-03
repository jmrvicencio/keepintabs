import { useState, useEffect } from 'react';
import {
  doc,
  collection,
  DocumentSnapshot,
  onSnapshot,
  DocumentReference,
  Unsubscribe,
  updateDoc,
  deleteDoc,
  runTransaction,
  deleteField,
} from 'firebase/firestore';
import { type Group, SerializedGroup, Member } from '../types';
import { collections, db } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { deserializeGroup } from '../utils/serializer';
import Members from '@/app/routes/App/Members';

const useGroupListener = (groupId: string = '') => {
  const navigate = useNavigate();
  const [group, setGroup] = useState<DocumentSnapshot<SerializedGroup> | null>(null);
  const [userData, setUserData] = useState<Member | null>(null);
  const [userGroupId, setUserGroupId] = useState<string | undefined>();
  const [unsubCalled, setUnsubCalled] = useState(false);
  const [loading, setLoading] = useState(true);

  let unsubscribeToSnapshot: Unsubscribe;
  useEffect(() => {
    const getDocs = async () => {
      const groupDoc = doc(db, 'groups', groupId) as DocumentReference<SerializedGroup>;
      if (unsubCalled) return;

      try {
        console.log('subscribing to snapshot');
        unsubscribeToSnapshot = onSnapshot(
          groupDoc,
          (groupSnap) => {
            const groupData: Group = deserializeGroup(groupSnap.data() as SerializedGroup)!;
            if (!groupData) return;

            const memberEntries = Object.entries(groupData.members);

            for (const [memberGroupId, val] of memberEntries) {
              const memberData = val as Member;
              if (memberData.linkedUid == auth.currentUser!.uid) {
                memberData.groupUid = memberGroupId;
                setUserData(memberData);
                setUserGroupId(memberGroupId);
                break;
              }
            }

            setGroup(groupSnap);
            setLoading(false);
          },
          (error) => {
            unsubscribeToSnapshot();
            console.error(error);
            navigate(ROUTES.APP);
          },
        );
      } catch (err) {
        const error = err as Error;
        toast.error(error.message);
        throw err;
      }
    };

    getDocs();
    return () => {
      console.log('ubsubscribing to snapshot');
      setUnsubCalled(true);
      unsubscribeToSnapshot();
    };
  }, []);

  const updateName = (nextName: string) => {
    const groupRef = doc(db, collections.groups, groupId) as DocumentReference<Group>;

    updateDoc(groupRef, {
      name: nextName,
    });
  };

  const deleteGroup = async () => {
    const groupRef = doc(db, collections.groups, groupId);
    const groupSnap = { ...group?.data() };
    const nextMemberUids = new Set(groupSnap.memberUids ?? []);
    const memberRef = doc(groupRef, collections.members, auth.currentUser!.uid);

    nextMemberUids.delete(auth.currentUser!.uid);

    console.log('uid size', nextMemberUids.size);
    if (nextMemberUids.size === 0) {
      await runTransaction(db, async (txn) => {
        await txn.delete(groupRef);
        await txn.delete(memberRef);
      });
    } else {
      // Remove linkedUid and email from members
      // delete uid from membersUid
      // delete member document from members collection
      const nextGroup = { ...groupSnap };
      const nextMembers = { ...nextGroup.members };

      const member = Object.entries(nextMembers).find(([key, val]) => val.linkedUid == auth.currentUser!.uid);
      const [memberId] = member ?? [''];
      delete nextMembers[memberId].linkedUid;
      delete nextMembers[memberId].email;

      nextGroup.members = nextMembers;
      nextGroup.memberUids = [...nextMemberUids];

      await runTransaction(db, async (txn) => {
        await txn.set(groupRef, nextGroup);
        await txn.delete(memberRef);
      });
    }
  };

  return { group, userData, updateName, userGroupId, deleteGroup, loading };
};

export default useGroupListener;
