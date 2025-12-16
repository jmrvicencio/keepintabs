import { useAtom } from 'jotai';
import { notificationsAtom } from '../store/notifications';
import { Notification } from '../types';
import { collection, CollectionReference, doc, updateDoc } from 'firebase/firestore';
import { collections, db } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/auth';

const useGetNotifications = () => {
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const seenNotif = async (id: string) => {
    const notifCollection = collection(
      db,
      collections.users,
      auth.currentUser!.uid,
      collections.notifications,
    ) as CollectionReference<Notification>;
    const notifRef = doc(notifCollection, id);

    await updateDoc(notifRef, {
      seen: true,
    });
  };

  return { notifications, seenNotif };
};

export default useGetNotifications;
