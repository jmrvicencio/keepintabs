import { doc, collection, getDoc, CollectionReference } from 'firebase/firestore';
import { db, collections } from '@/lib/firebase/firestore';
import { Group } from '../types';

const useFetchGroup = (groupId: string) => async () => {
  const groupCollection = collection(db, collections.groups) as CollectionReference<Group>;
  const groupRef = doc(groupCollection, groupId);
  const groupDoc = await getDoc(groupRef);

  return groupDoc;
};

export default useFetchGroup;
