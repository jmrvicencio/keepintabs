import { useState, MouseEvent } from 'react';

function Debug({ showDebug = false }) {
  const [initialPos, setInitialPos] = useState<number[]>([]);
  const [debugPos, setDebugPos] = useState([12, 12]);
  const [oldDebugPos, setOldDebugPos] = useState(debugPos);

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

  return (
    <div
      style={style}
      className={`${!showDebug && 'hidden'} bg-accent-200/60 absolute z-1 p-4`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <p className="select-none">debug</p>
    </div>
  );
}

export default Debug;
