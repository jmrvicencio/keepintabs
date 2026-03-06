import { collections, db } from '@/lib/firebase/firestore';
import { collection, doc, DocumentReference, DocumentSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { Group, Member, SerializedGroup } from '../types';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import Members from '@/app/routes/App/Members';
import { tryWrap } from '@/util/helpers';
import { serializeGroup } from '../utils/serializer';

export const useUpdateGroup = (group: DocumentSnapshot<SerializedGroup | null> | null) => {
  const groupCollection = collection(db, collections.groups);
  const groupRef = doc(groupCollection, group?.id ?? 'a') as DocumentReference<Group>;

  const addMember = async (member: Member, memberId: string = uuid()) => {
    try {
      if (!group) return;

      const groupData = group.data()!;
      const nextMembers = { ...groupData.members };

      nextMembers[memberId] = member;

      await updateDoc(groupRef, {
        members: nextMembers,
      });
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      throw err;
    }
  };

  const removeMember = (memberUid: string, groupData: Group) => {
    tryWrap(async () => {
      const nextMembers = { ...groupData.members, [memberUid]: { ...groupData.members[memberUid], active: false } };
      const { [memberUid]: __, ...nextExpenses } = groupData.expenses;
      const { [memberUid]: ___, ...nextSpent } = groupData.spent;
      const nextMemberUids = new Set(groupData.memberUids);
      const linkedUid = groupData.members[memberUid].linkedUid;
      // Firebase doc refs
      const groupCollection = collection(db, collections.groups);
      const groupRef = doc(groupCollection, group?.id ?? 'a') as DocumentReference<SerializedGroup>;
      const groupMemberRef = doc(groupRef, collections.members, linkedUid ?? 'a');
      // group data
      const nextGroup: SerializedGroup = serializeGroup({
        ...groupData,
        members: nextMembers,
        expenses: nextExpenses,
        spent: nextSpent,
      });

      nextMemberUids.delete(memberUid);

      await runTransaction(db, async (txn) => {
        await txn.set(groupRef, nextGroup);

        if (linkedUid) await txn.delete(groupMemberRef);
      });
    });
  };

  return { addMember, removeMember };
};
