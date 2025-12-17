import { collections, db } from '@/lib/firebase/firestore';
import { collection, CollectionReference, doc, getDoc } from 'firebase/firestore';
import { User } from '../types';

const useGetUser = () => async (id: string) => {
  const userCollection = collection(db, collections.users) as CollectionReference<User>;
  const userRef = doc(userCollection, id);

  return await getDoc(userRef);
};

export default useGetUser;
