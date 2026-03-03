import { collections, db } from '@/lib/firebase/firestore';
import { collection, doc, DocumentReference, DocumentSnapshot, updateDoc } from 'firebase/firestore';
import { Group, Member, SerializedGroup } from '../types';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import Members from '@/app/routes/App/Members';

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

  return { addMember };
};
