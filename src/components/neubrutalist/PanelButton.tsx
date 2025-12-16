import { MouseEvent, useState, type ReactNode } from 'react';
import { L } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';

const PanelButton = ({
  children,
  onClick: handleClick = (e: MouseEvent) => {},
  bgColor,
  padding,
  rounded,
  className = '',
  wallColor,
  dropOnClick = false,
  locked = false,
}: {
  children?: ReactNode;
  onClick?: (e: MouseEvent) => any;
  bgColor?: string;
  padding?: string;
  rounded?: string;
  className?: string;
  wallColor?: string;
  dropOnClick?: boolean;
  locked?: boolean;
}) => {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = (e: any) => {
    if (dropOnClick && !locked) {
      e.stopPropagation();
      setPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (locked) return;

    setPressed(false);
  };

  const handlePreClick = (e: MouseEvent) => {
    if (locked) return;

    handleClick(e);
  };

  return (
    <div
      className="relative pb-1"
      onClick={handlePreClick}
      onMouseDown={handleMouseDown}
      onPointerDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseUp}
    >
      <div
        className={`${pressed && 'pressed'} ${bgColor || 'bg-white'} ${padding || 'p-2'} ${className} ${rounded || 'rounded-2xl'} border-ink-800 relative z-1 border transition-transform [.pressed]:translate-y-0.5`}
      >
        {children}
      </div>
      <div
        className={`${rounded || 'rounded-2xl'} ${wallColor || 'bg-ink-800'} border-ink-800 absolute inset-x-0 inset-y-0.5 bottom-0 z-0 border`}
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

export default PanelButton;
