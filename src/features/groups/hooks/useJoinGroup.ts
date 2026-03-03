import { collections, db } from '@/lib/firebase/firestore';
import {
  collection,
  CollectionReference,
  deleteField,
  doc,
  DocumentReference,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { GroupMember, InviteKey, SerializedGroup } from '../types';
import toast from 'react-hot-toast';
import { deserializeGroup } from '../utils/serializer';
import { auth } from '@/lib/firebase/auth';

const useJoinGroup = () => async (groupId: string, memberUid: string, inviteKey: string) => {
  try {
    const userId = auth.currentUser!.uid;
    const groupCollection = collection(db, collections.groups) as CollectionReference<SerializedGroup>;
    const groupRef = doc(groupCollection, groupId) as DocumentReference<SerializedGroup>;
    const groupMembersRef = doc(groupRef, collections.members, userId) as DocumentReference<GroupMember>;
    const inviteKeyRef = doc(groupRef, collections.inviteKeys, inviteKey) as DocumentReference<InviteKey>;

    await setDoc(groupMembersRef, {
      admin: false,
      groupUid: memberUid,
      inviteKey: inviteKey,
    });

    const groupSnap = await getDoc(groupRef);
    if (!groupSnap.exists()) throw new Error('Group not found');
    const groupData = groupSnap.data();

    // const nextInvitedUids = groupSnap.data().invitedUids ?? [];
    const nextMemberUids = [...groupData.memberUids];
    const nextMembers = { ...groupData.members };

    nextMembers[memberUid].linkedUid = userId;
    nextMemberUids.push(userId);

    updateDoc(groupRef, {
      memberUids: nextMemberUids,
      members: nextMembers,
    });

    // remove inviteKey after joining the group
    await runTransaction(db, async (transaction) => {
      await transaction.update(groupRef, {
        memberUids: nextMemberUids,
        members: nextMembers,
      });

      await transaction.update(groupMembersRef, {
        inviteKey: deleteField(),
      });

      // await transaction.update(inviteKeyRef, {
      //   valid: false,
      // });
      await transaction.delete(inviteKeyRef);
    });

    // await updateDoc(groupMembersRef, {
    //   inviteKey: deleteField(),
    // });

    return;
  } catch (err) {
    const error = err as Error;
    // toast.error(error.message);
    throw err;
  }
};

export default useJoinGroup;
