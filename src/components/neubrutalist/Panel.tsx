import { useReducer, useState, type ReactNode } from 'react';

const Panel = ({
  children,
  onClick: handleClick = () => {},
  bgColor,
  padding,
  rounded,
  wallColor,
  dropOnClick = false,
  className = '',
}: {
  children?: ReactNode;
  onClick?: () => any;
  bgColor?: string;
  padding?: string;
  rounded?: string;
  className?: string;
  wallColor?: string;
  dropOnClick?: boolean;
}) => {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = (e: any) => {
    if (dropOnClick) {
      e.stopPropagation();
      setPressed(true);
    }
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  return (
    <div
      className="relative pr-1 pb-1"
      onMouseDown={handleMouseDown}
      onPointerDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseUp}
    >
      <div
        className={`${pressed && 'pressed'} ${bgColor || 'bg-white'} ${padding || 'p-2'} ${className} ${rounded || 'rounded-2xl'} border-ink-800 relative z-1 border-1 transition-transform [.pressed]:translate-0.5`}
      >
        {children}
      </div>
      <div
        className={`${rounded || 'rounded-2xl'} ${wallColor || 'bg-ink-800'} border-ink-800 absolute inset-x-0.5 inset-y-0.5 right-0 bottom-0 z-0 border-1`}
      />
    </div>
  );
};

type Action = { type: 'press' } | { type: 'release' };

const panelClickedReducer = (state: boolean, action: Action) => {
  switch (action.type) {
    case 'press':
      return true;
    case 'release':
      return false;
    default:
      throw Error('Unkown Action');
  }

  throw Error('Unkown Action');
};

export default Panel;
