import { useState, useEffect, useCallback } from 'react';
import {
  getDocsFromCache,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  type QuerySnapshot,
  DocumentSnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';

import { auth } from '../../../lib/firebase/auth';
import { db } from '../../../lib/firebase/firestore';
import { dataFetchedAtom as storeDataFetchedAtom } from '../stores/dataFetched';
import { Group } from '../types';

const useGroups = (dataFetchedAtom = storeDataFetchedAtom) => {
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

export default useGroups;
