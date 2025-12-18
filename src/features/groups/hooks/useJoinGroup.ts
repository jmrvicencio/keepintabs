import { collections, db } from '@/lib/firebase/firestore';
import {
  collection,
  CollectionReference,
  deleteField,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { SerializedGroup } from '../types';
import toast from 'react-hot-toast';
import { deserializeGroup } from '../utils/serializer';
import { auth } from '@/lib/firebase/auth';

const useJoinGroup = () => async (groupId: string, memberUid: string, inviteKey: string) => {
  try {
    const userId = auth.currentUser!.uid;
    const groupCollection = collection(db, collections.groups) as CollectionReference<SerializedGroup>;
    const groupRef = doc(groupCollection, groupId) as DocumentReference<SerializedGroup>;
    const groupMembersRef = doc(groupRef, collections.members, userId);

    await setDoc(groupMembersRef, {
      admin: false,
      inviteKey: inviteKey,
    });

    const groupSnap = await getDoc(groupRef);
    if (!groupSnap.exists()) throw new Error('Group not found');

    // const nextInvitedUids = groupSnap.data().invitedUids ?? [];
    const nextMemberUids = groupSnap.data().memberUids;
    const nextMembers = groupSnap.data().members;

    nextMembers[memberUid].linkedUid = userId;

    // nextInvitedUids.push(userId);
    nextMemberUids.push(userId);

    updateDoc(groupRef, {
      memberUids: nextMemberUids,
      members: nextMembers,
      // invitedUids: nextInvitedUids,
    });

    await updateDoc(groupMembersRef, {
      inviteKey: deleteField(),
    });

    return;
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    throw err;
  }
};

export default useJoinGroup;
