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
    // Everytime the window is focused (Alt+Tabbed) Check if the data is stale
    // so it can be refetched if it is.
    const onFocus = () => {
      const isStale = Date.now() - dataFetched.fetchedAt > dataFetched.staleTime;
      if (isStale) {
        fetchGroups();
      }
    };

    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [dataFetched]);

  useEffect(() => {
    fetchGroups();
  }, [refetch]);

  // Fetches and assigns all groups a member is part of to groupSnap.
  // Returns cached data if the last time fetched is not yet stale.
  async function fetchGroups() {
    try {
      let groupsSnap: QuerySnapshot<Group>;
      const isStale = Date.now() - dataFetched.fetchedAt > dataFetched.staleTime;
      const q = query(
        collection(db, 'groups') as CollectionReference<Group>,
        where('memberUids', 'array-contains', auth.currentUser!.uid),
        orderBy('createdAt'),
      );

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

  return { groups, loading, reload, setLoading };
};
