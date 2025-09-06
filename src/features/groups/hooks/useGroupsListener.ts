import { useState, useEffect } from 'react';
import { doc, DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { type Group, Member } from '../types';
import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';

const useGroupListener = (groupId: string = '') => {
  const [group, setGroup] = useState<DocumentSnapshot | null>(null);
  const [userData, setUserData] = useState<Member | null>(null);

  useEffect(() => {
    const unsubscribeToSnapshot = onSnapshot(doc(db, 'groups', groupId), (groupSnap) => {
      setGroup(groupSnap);

      const groupData = groupSnap.data() as Group;
      const memberEntries = Object.entries(groupData.members);

      for (const [memberUid, val] of memberEntries) {
        const memberData = val as Member;
        if (memberData.linkedUid == auth.currentUser?.uid) {
          memberData.groupUid = memberUid;
          setUserData(memberData);
          break;
        }
      }
    });

    return unsubscribeToSnapshot;
  }, []);

  return { group, userData };
};

export default useGroupListener;
