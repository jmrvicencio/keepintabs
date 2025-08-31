import { useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firestore';
import { auth } from '../firebase/auth';

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
      memberUids: ['marlon', ...memberUids],
      members: {
        [auth.currentUser!.uid]: {
          displayName: 'Kyle',
          linkedUid: auth.currentUser!.uid,
        },
        julian: {
          displayName: 'Julian',
        },
        marlon: {
          displayName: 'Marlon',
        },
      },
      balance: {
        [auth.currentUser!.uid]: {
          marlon: 700,
          julian: 0,
        },
        marlon: {
          [auth.currentUser!.uid]: 100,
          julian: 0,
        },
        julian: {
          [auth.currentUser!.uid]: 200,
          marlon: 50,
        },
      },
    };

    await updateDoc(groupDoc, data);
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
    </div>
  );
}

export default Debug;
