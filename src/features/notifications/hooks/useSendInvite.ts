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
import { auth } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';

const useSendInvite = () => async (email: string, groupName: string, groupId: string, inviteKey: string) => {
  try {
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
      invitedBy: auth.currentUser!.uid,
      groupId,
      groupName,
      inviteKey,
      seen: false,
    };

    await setDoc(notifRef, {
      dateCreated: serverTimestamp(),
      ...notifData,
    });
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    throw err;
  }
};

export default useSendInvite;
