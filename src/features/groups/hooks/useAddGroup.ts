import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  serverTimestamp,
  runTransaction,
  DocumentReference,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db, getFirestoreURL } from '../../../lib/firebase/firestore';
import { User } from 'firebase/auth';
import { Group, Member } from '../types';
import { auth } from '../../../lib/firebase/auth';

const useAddGroup = (user: User) => {
  const addNewGroup = async (groupName: string, members: Member[]) => {
    try {
      const groupId = uuid();
      const userId = user.uid;

      const inviteKey = uuid();
      const groupsRef = doc(db, `groups/${groupId}`) as DocumentReference<Group>;
      const groupMembersRef = doc(db, `groupMembers/${userId}_${groupId}`);
      const groupSettingsRef = doc(db, `groupSettings/${groupId}`);

      const nextMembers: Record<string, Member> = {};

      for (let member of members) {
        console.log('members', member);
        const memberUid = uuid();
        nextMembers[memberUid] = member;
      }

      nextMembers[userId] = {
        displayName: user.displayName ?? 'Unknown',
        linkedUid: userId,
      };

      await setDoc(groupSettingsRef, {
        inviteKey,
      });

      await setDoc(groupMembersRef, {
        userId,
        groupId,
        inviteKey,
      });

      setDoc(groupsRef, {
        createdAt: serverTimestamp(),
        name: groupName,
        memberUids: [userId],
        members: nextMembers,
        balance: {},
        expenses: {},
        spent: {},
      });

      await updateDoc(groupMembersRef, {
        inviteKey: deleteField(),
      });

      return;
    } catch (err) {
      throw err;
    }
  };

  return addNewGroup;
};

export default useAddGroup;
