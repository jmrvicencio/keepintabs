import { collections, db } from '@/lib/firebase/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Notification } from '../types';

const useSendInvite = () => async (userId: string, groupId: string, inviteKey: string) => {
  const notifCollection = collection(db, collections.users, userId, collections.notifications);
  const notifRef = doc(notifCollection, groupId);

  const dummyNotif: Notification = {
    type: 'invite',
    inviteKey,
    groupId,
    seen: false,
  };

  await setDoc(notifRef, dummyNotif);
};

export default useSendInvite;
