import { collections, db } from '../../../lib/firebase/firestore';
import { getDoc, doc, DocumentSnapshot, DocumentReference } from 'firebase/firestore';
import { type User } from '../types';

export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, collections.users, uid) as DocumentReference<User>;
  const docSnap: DocumentSnapshot<User> = await getDoc(userRef);

  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};
