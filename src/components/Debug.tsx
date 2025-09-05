import { useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc, deleteField } from 'firebase/firestore';

import { db } from '../lib/firebase/firestore';
import { auth } from '../lib/firebase/auth';

function Debug({ showDebug = false }) {
  const [initialPos, setInitialPos] = useState<number[]>([]);
  const [debugPos, setDebugPos] = useState([12, 12]);
  const [oldDebugPos, setOldDebugPos] = useState(debugPos);
  const { group } = useParams();

  const style = {
    top: `${debugPos[1]}px`,
    left: `${debugPos[0]}px`,
  };

  const handleMouseDown = (e: MouseEvent) => {
    setInitialPos([e.clientX, e.clientY]);
    setOldDebugPos(debugPos);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.buttons != 1) return;

    const newPos = [oldDebugPos[0] + (e.clientX - initialPos[0]), oldDebugPos[1] + (e.clientY - initialPos[1])];
    setDebugPos(newPos);
  };

  const handleAddDummyGroupClicked = async () => {
    console.log(group);
    const groupDoc = doc(db, `groups/${group}`);
    const docData = await getDoc(groupDoc);
    const memberUids = docData.data()?.memberUids;

    const data = {
      memberUids: [...memberUids],
      members: {
        [auth.currentUser!.uid]: {
          displayName: 'Kyle',
          linkedUid: auth.currentUser!.uid,
        },
        testId1234: {
          displayName: 'Julian',
        },
        testId3214: {
          displayName: 'Marlon',
        },
        testIdabd: {
          displayName: 'Jayni',
        },
      },
      balance: {
        [auth.currentUser!.uid]: {
          testId3214: 0,
          testId1234: 0,
        },
        testId3214: {
          [auth.currentUser!.uid]: 150,
          testId1234: 0,
        },
        testId1234: {
          [auth.currentUser!.uid]: 200,
          testId3214: 50,
        },
        testIdabd: {
          testId1234: 100,
        },
      },
    };

    await updateDoc(groupDoc, data);
  };

  const handleClearAllData = async () => {
    const groupDoc = doc(db, `groups/${group}`);

    await updateDoc(groupDoc, {
      balance: deleteField(),
      // members: {
      //   [auth.currentUser!.uid]: {
      //     displayName: 'Kyle',
      //     linkedUid: auth.currentUser!.uid,
      //   },
      // },
    });
    // const docData = await getDoc(groupDoc);
    // const memberUids = docData.data()?.memberUids;
  };

  return (
    <div
      style={style}
      className={`${!showDebug && 'hidden'} bg-accent-200/60 absolute z-1 p-4`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <p className="select-none" onClick={handleAddDummyGroupClicked}>
        Add Group Dummy
      </p>
      <p className="select-none" onClick={handleClearAllData}>
        Clear Dummy Data
      </p>
    </div>
  );
}

export default Debug;
