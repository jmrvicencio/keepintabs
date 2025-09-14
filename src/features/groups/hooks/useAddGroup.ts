import { auth } from '../../../lib/firebase/auth';
import { doc, updateDoc, deleteField, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../../../lib/firebase/firestore';

const useAddGroup = (uid: string) => {
  const addNewGroup = async (groupName: string) => {
    const groupId = uuid();
    const userId = uid;
    const inviteKey = uuid();
    const groups = doc(db, `groups/${groupId}`);
    const groupMembers = doc(db, `groupMembers/${uid}_${groupId}`);
    const groupSettings = doc(db, `groupSettings/${groupId}`);

    setDoc(groupSettings, {
      inviteKey,
    });
    setDoc(groups, {
      createdAt: serverTimestamp(),
      inviteKey,
      name: groupName,
      memberUids: [userId],
      members: {
        [userId]: {
          displayName: 'Kyle',
          linkedUid: userId,
        },
      },
    });
    updateDoc(groups, {
      inviteKey: deleteField(),
    });
    await setDoc(groupMembers, {
      userId,
      groupId,
      inviteKey,
    });
    updateDoc(groupMembers, {
      inviteKey: deleteField(),
    });
  };

  return addNewGroup;
};

export default useAddGroup;
