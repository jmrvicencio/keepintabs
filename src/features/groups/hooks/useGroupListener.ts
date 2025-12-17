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
} from 'firebase/firestore';
import { type Group, SerializedGroup, Member } from '../types';
import { collections, db } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { deserializeGroup } from '../utils/serializer';

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
            const groupData: Group = deserializeGroup(groupSnap.data() as SerializedGroup);
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

    nextMemberUids.delete(auth.currentUser!.uid);

    if (nextMemberUids.size === 0) {
      await deleteDoc(groupRef);
    } else {
      await updateDoc(groupRef, {
        memberUids: nextMemberUids,
      });
    }
  };

  return { group, userData, updateName, userGroupId, deleteGroup, loading };
};

export default useGroupListener;
