import { collections, db } from '@/lib/firebase/firestore';
import { collection, CollectionReference, deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { SerializedGroup } from '../types';
import toast from 'react-hot-toast';
import { deserializeGroup } from '../utils/serializer';
import { auth } from '@/lib/firebase/auth';

const useJoinGroup = () => async (groupId: string, inviteKey: string) => {
  try {
    const userId = auth.currentUser!.uid;
    const groupMembersCollection = collection(db, collections.members);
    const groupMembersRef = doc(groupMembersCollection, `${userId}_${groupId}`);
    const groupCollection = collection(db, collections.groups) as CollectionReference<SerializedGroup>;
    const groupRef = doc(groupCollection, groupId);

    await setDoc(groupMembersRef, {
      groupId,
      userId,
      inviteKey,
    });

    const groupSnap = await getDoc(groupRef);
    if (!groupSnap.exists()) throw new Error('Group not found');
    const nextInvitedUids = groupSnap.data().invitedUids ?? [];
    const nextMemberUids = groupSnap.data().memberUids;
    nextMemberUids.push(userId);
    nextInvitedUids.push(userId);

    updateDoc(groupRef, {
      memberUids: nextMemberUids,
      invitedUids: nextInvitedUids,
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
