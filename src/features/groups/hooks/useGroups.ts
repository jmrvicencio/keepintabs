import { useState, useEffect, useCallback } from 'react';
import {
  getDocsFromCache,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  DocumentSnapshot,
  CollectionReference,
  onSnapshot,
  doc,
  QuerySnapshot,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';

import { auth } from '../../../lib/firebase/auth';
import { db } from '../../../lib/firebase/firestore';
import { dataFetchedAtom as storeDataFetchedAtom } from '../stores/dataFetched';
import { Group } from '../types';

interface GroupData {
  groups?: DocumentSnapshot<Group>[];
  loading: boolean;
  reload: () => void;
}

export const useGroups = (dataFetchedAtom = storeDataFetchedAtom) => {
  const [groups, setGroups] = useState<DocumentSnapshot<Group>[]>();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [dataFetched, setDataFetched] = useAtom(dataFetchedAtom);

  useEffect(() => {
    async function fetchGroups() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'groups') as CollectionReference<Group>,
          where('memberUids', 'array-contains', auth.currentUser!.uid),
          orderBy('createdAt'),
        );
        let groupsSnap: QuerySnapshot<Group>;

        if (dataFetched) {
          groupsSnap = await getDocsFromCache(q);
        } else {
          groupsSnap = await getDocs(q);
          setDataFetched(true);
        }

        setLoading(false);
        setGroups(groupsSnap.docs);
      } catch (err) {
        const error = err as Error;
        toast.error(error.message);
        throw err;
      }
    }

    fetchGroups();
  }, [refetch]);

  const reload = useCallback(() => {
    setRefetch((prev) => !prev);
  }, []);

  return { groups, loading, reload };
};

export const groupsLoader = () => {
  const fetchData = async () => {
    try {
      await auth.authStateReady();
      const q = query(
        collection(db, 'groups') as CollectionReference<Group>,
        where('memberUids', 'array-contains', auth.currentUser!.uid),
        orderBy('createdAt'),
      );

      const data: GroupData = {
        groups: undefined,
        loading: true,
        reload: () => {},
      };

      const reload = (setState = (state: DocumentSnapshot<Group>[]) => {}) => {
        let initialCheck = true;
        data.loading = true;
        const unsub = onSnapshot(q, (snap) => {
          data.groups = snap.docs;
          data.loading = false;
          setState(data.groups);

          if (initialCheck) {
            initialCheck = false;
            setTimeout(
              () => {
                console.log('manually ubsubbing');
                unsub();
              },
              2 * 60 * 100, // 2 minutes
            );
          } else {
            unsub();
          }
        });
      };

      data.reload = reload;

      return new Promise<GroupData>((resolve, reject) => {
        const unsubInitial = onSnapshot(
          q,
          (snaps) => {
            data.groups = snaps.docs;
            data.loading = false;
            unsubInitial();
            resolve(data);
          },
          reject,
        );
      });
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };
  return fetchData();
};
