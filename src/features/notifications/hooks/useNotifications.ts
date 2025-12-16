import { collection, CollectionReference, limit, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Notification } from '../types';
import { collections, db } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import { notificationsAtom } from '../store/notifications';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';

const useNotifications = () => {
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  useEffect(() => {
    const notificationCollection = collection(
      db,
      collections.users,
      auth.currentUser!.uid,
      collections.notifications,
    ) as CollectionReference<Notification>;
    const q = query(notificationCollection, orderBy('dateCreated', 'desc'), limit(10));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setNotifications(snap);
      },
      (err) => {
        unsubscribe();
        const error = err as Error;
        toast.error(error.message);
        throw error;
      },
    );

    return unsubscribe;
  }, []);

  return { notifications };
};

export default useNotifications;
