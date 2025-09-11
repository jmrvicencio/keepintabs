import React, { useState, useEffect, useCallback } from 'react';
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

export interface GroupData {
  groups?: DocumentSnapshot<Group>[];
  loading: boolean;
  reload: () => void;
  setState?: (state: any) => void;
  addSetter: any;
  unsubscribe?: () => void;
}

export const useGroups = (dataFetchedAtom = storeDataFetchedAtom) => {
  const [groups, setGroups] = useState<DocumentSnapshot<Group>[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [dataFetched, setDataFetched] = useAtom(dataFetchedAtom);

  useEffect(() => {
    const onFocus = () => {
      console.log(Date.now() - dataFetched.fetchedAt);
      const isStale = Date.now() - dataFetched.fetchedAt > dataFetched.staleTime;
      console.log(isStale);
      if (isStale) {
        fetchGroups();
      }
    };

    window.addEventListener('focus', onFocus);

    return () => {
      console.log('remove listener');
      window.removeEventListener('focus', onFocus);
    };
  }, [dataFetched]);

  useEffect(() => {
    fetchGroups();
  }, [refetch]);

  async function fetchGroups() {
    try {
      const q = query(
        collection(db, 'groups') as CollectionReference<Group>,
        where('memberUids', 'array-contains', auth.currentUser!.uid),
        orderBy('createdAt'),
      );
      let groupsSnap: QuerySnapshot<Group>;

      const isStale = Date.now() - dataFetched.fetchedAt > dataFetched.staleTime;
      if (dataFetched.fetched && !isStale) {
        groupsSnap = await getDocsFromCache(q);
      } else {
        groupsSnap = await getDocs(q);
        setDataFetched({
          ...dataFetched,
          fetched: true,
          fetchedAt: Date.now(),
        });
        console.log('setting data fetched!');
      }

      setLoading(() => false);
      setGroups(groupsSnap.docs);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      throw err;
    }
  }

  const reload = useCallback((fromServer = false) => {
    if (fromServer) {
      setDataFetched((prev) => ({
        ...prev,
        fetched: false,
      }));
    }

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
        addSetter: (setter: any) => {
          data.setState = setter;
        },
      };

      return new Promise<GroupData>((resolve, reject) => {
        let initializing = true;
        const unsub = onSnapshot(
          q,
          (snaps) => {
            data.groups = snaps.docs;
            data.loading = false;

            console.log('Groups Page: Data has changed');

            if (data.setState) {
              data.setState(data.groups);
            }

            if (initializing) {
              data.unsubscribe = unsub;
              resolve(data);
              initializing = false;
            }
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
