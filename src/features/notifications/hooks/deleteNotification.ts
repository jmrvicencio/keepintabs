import { auth } from '@/lib/firebase/auth';
import { collections, db } from '@/lib/firebase/firestore';
import { collection, CollectionReference, deleteDoc, doc } from 'firebase/firestore';
import { Notification } from '../types';
import toast from 'react-hot-toast';

const useDeleteNotification = () => async (notifId: string) => {
  try {
    const notifCollection = collection(
      db,
      collections.users,
      auth.currentUser!.uid,
      collections.notifications,
    ) as CollectionReference<Notification>;
    const notifRef = doc(notifCollection, notifId);

    await deleteDoc(notifRef);
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    throw err;
  }
};

export default useDeleteNotification;
