import { collections, db } from '@/lib/firebase/firestore';
import {
  collection,
  CollectionReference,
  doc,
  setDoc,
  where,
  query,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { Notification } from '../types';
import { User } from '@/features/users/types';

const useSendInvite = () => async (email: string, groupId: string, inviteKey: string) => {
  // Check if user is valid
  const userCollection = collection(db, collections.users) as CollectionReference<User>;
  const q = query(userCollection, where('email', '==', email));
  const userSnap = await getDocs(q);

  if (userSnap.size == 0) return;

  const userId = userSnap.docs[0].id;
  const notifCollection = collection(db, collections.users, userId, collections.notifications);
  const notifRef = doc(notifCollection, groupId);

  const notifData: Notification = {
    type: 'invite',
    inviteKey,
    groupId,
    seen: false,
  };

  await setDoc(notifRef, {
    dateCreated: serverTimestamp(),
    ...notifData,
  });
};

export default useSendInvite;
