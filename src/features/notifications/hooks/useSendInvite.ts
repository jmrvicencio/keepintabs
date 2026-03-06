import { collections, db } from '@/lib/firebase/firestore';
import {
  collection,
  CollectionReference,
  doc,
  setDoc,
  where,
  query,
  getDoc,
  getDocs,
  serverTimestamp,
  DocumentReference,
  Timestamp,
  FirestoreError,
  runTransaction,
} from 'firebase/firestore';
import { Notification } from '../types';
import { User } from '@/features/users/types';
import { auth } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { InviteKey, Member } from '@/features/groups/types';
import { b } from 'vitest/dist/chunks/suite.d.FvehnV49';

const useSendInvite =
  () => async (memberUid: string, member: Member, groupName: string, groupId: string, inviteKey?: string) => {
    try {
      // Check if user is valid
      const userCollection = collection(db, collections.users) as CollectionReference<User>;
      const q = query(userCollection, where('email', '==', member.email));
      const userSnap = await getDocs(q);
      const generateInviteKey = !inviteKey;
      const userId = userSnap.docs[0].id;
      const notifCollection = collection(db, collections.users, userId, collections.notifications);
      const notifRef = doc(notifCollection, groupId);

      if (userSnap.size == 0) return;

      if (!inviteKey) {
        inviteKey = member.inviteKey ?? uuid();
      }

      const notifData: Notification = {
        type: 'invite',
        invitedBy: auth.currentUser!.uid,
        groupId,
        groupName,
        memberUid,
        inviteKey,
        seen: false,
      };

      await runTransaction(db, async (txn) => {
        txn.set(notifRef, {
          dateCreated: serverTimestamp(),
          ...notifData,
        });

        if (generateInviteKey) {
          const inviteId = member.inviteKey ?? uuid();
          const groupCollection = collection(db, collections.groups);
          const groupRef = doc(groupCollection, groupId);
          const inviteRef = doc(groupRef, collections.inviteKeys, inviteId) as DocumentReference<InviteKey>;
          const date = new Date();
          date.setMonth(date.getMonth() + 1);

          if (!(await getDoc(inviteRef)).exists()) {
            await txn.set(inviteRef, {
              inviteKey: inviteKey!,
              valid: true,
              expires: Timestamp.fromDate(date),
            });
          }
        }
      });
    } catch (err) {
      const error = err as FirestoreError;
      throw err;
    }
  };

export default useSendInvite;
