import { useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase/firestore';

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
    const data = {
      balance: {
        e4tlfOvO33N4ysI5qSI6oNJ8jcuS: {
          marlon: 200,
          julian: 0,
        },
        marlon: {
          e4tlfOvO33N4ysI5qSI6oNJ8jcuS: 100,
          julian: 0,
        },
        julian: {
          e4tlfOvO33N4ysI5qSI6oNJ8jcuS: 200,
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
