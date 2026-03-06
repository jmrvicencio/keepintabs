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
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { collections, db, getFirestoreURL } from '../../../lib/firebase/firestore';
import { User } from 'firebase/auth';
import { Group, Member, SerializedGroup, InviteKey, GroupMember } from '../types';
import { auth } from '../../../lib/firebase/auth';

const useAddGroup = (user: User) => {
  const addNewGroup = async (groupName: string, members: Member[]) => {
    try {
      const groupId = uuid();
      const userId = user.uid;

      const groupsCollection = collection(db, collections.groups) as CollectionReference<SerializedGroup>;
      const groupRef = doc(groupsCollection, groupId) as DocumentReference<SerializedGroup>;
      const groupMembersRef = doc(groupRef, collections.members, userId) as DocumentReference<GroupMember>;

      const nextMembers: Record<string, Member> = {};

      nextMembers[userId] = {
        displayName: user.displayName ?? 'Unknown',
        active: true,
        email: user.email!,
        linkedUid: userId,
      };

      for (let member of members) {
        console.log('members', member);
        const memberUid = uuid();
        const nextMember = member;

        if (nextMember.email) nextMember.inviteKey = uuid();

        nextMembers[memberUid] = nextMember;
      }

      const group: SerializedGroup = {
        name: groupName,
        memberUids: [userId],
        adminUids: [userId],
        members: nextMembers,
        expenses: {},
        spent: {},
      };

      // Create Group
      await setDoc(groupRef, {
        ...group,
        createdAt: serverTimestamp(),
      });

      // Create Group Member Doc
      await setDoc(groupMembersRef, {
        admin: true,
        groupUid: userId,
      });

      // Remove InviteKey from memberDoc
      // await updateDoc(groupMembersRef, {
      //   inviteKey: deleteField(),
      // });

      return { groupId, group };
    } catch (err) {
      throw err;
    }
  };

  return addNewGroup;
};

export default useAddGroup;
