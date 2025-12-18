import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  serverTimestamp,
  runTransaction,
  DocumentReference,
  collection,
  CollectionReference,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { collections, db, getFirestoreURL } from '../../../lib/firebase/firestore';
import { User } from 'firebase/auth';
import { Group, Member, SerializedGroup } from '../types';
import { auth } from '../../../lib/firebase/auth';

interface GroupMember {
  admin: boolean;
  inviteKey?: string;
}

const useAddGroup = (user: User) => {
  const addNewGroup = async (groupName: string, members: Member[]) => {
    try {
      const groupId = uuid();
      const userId = user.uid;

      const inviteKey = uuid();
      const adminKey = uuid();
      const groupsCollection = collection(db, collections.groups) as CollectionReference<SerializedGroup>;
      const groupRef = doc(groupsCollection, groupId) as DocumentReference<SerializedGroup>;
      const groupMembersRef = doc(groupRef, collections.members, userId) as DocumentReference<GroupMember>;
      const inviteKeyRef = doc(groupRef, collections.settings, 'inviteKey');
      const adminKeyRef = doc(groupRef, collections.settings, 'adminKey');

      const nextMembers: Record<string, Member> = {};

      nextMembers[userId] = {
        displayName: user.displayName ?? 'Unknown',
        linkedUid: userId,
      };

      for (let member of members) {
        console.log('members', member);
        const memberUid = uuid();
        nextMembers[memberUid] = member;
      }

      const group: SerializedGroup = {
        name: groupName,
        memberUids: [userId],
        members: nextMembers,
        expenses: {},
        spent: {},
      };

      // Create Doc Rules
      await Promise.all([
        setDoc(inviteKeyRef, {
          inviteKey,
        }),
        setDoc(adminKeyRef, {
          adminKey,
        }),
        setDoc(groupMembersRef, {
          admin: true,
          inviteKey,
        }),
      ]);

      // Create Group
      await setDoc(groupRef, {
        ...group,
        createdAt: serverTimestamp(),
      });

      // Remove InviteKey from memberDoc
      await updateDoc(groupMembersRef, {
        inviteKey: deleteField(),
      });

      return { groupId, inviteKey, group };
    } catch (err) {
      throw err;
    }
  };

  return addNewGroup;
};

export default useAddGroup;
