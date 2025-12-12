import { KeyboardEvent, useEffect, useReducer, useState, type ReactNode } from 'react';

const Panel = ({
  children,
  onClick: handleClick = () => {},
  bgColor,
  padding,
  rounded,
  wallColor,
  dropOnClick = false,
  hideWalls = false,
  className = '',
  inactive = false,
  margin,
}: {
  children?: ReactNode;
  onClick?: () => any;
  bgColor?: string;
  padding?: string;
  rounded?: string;
  className?: string;
  wallColor?: string;
  dropOnClick?: boolean;
  hideWalls?: boolean;
  inactive?: boolean;
  margin?: string;
}) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setPressed(inactive);
  }, [inactive]);

  const handleMouseDown = (e: any) => {
    if (dropOnClick) {
      e.stopPropagation();
      setPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!inactive) {
      setPressed(false);
    }
  };

  const handleClickWrapper = () => {
    if (!inactive) {
      handleClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter' || e.key == ' ') {
      if (handleClick != null) {
        handleClick();
      }
    }
  };

  return (
    <div
      {...(handleClick != null ? { tabIndex: 0, onKeyDown: handleKeyDown } : {})}
      className={`relative pr-1 pb-1 ${margin}`}
      onMouseDown={handleMouseDown}
      onPointerDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onPointerUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseUp}
      onClick={handleClickWrapper}
    >
      <div
        {...(handleClick != null && { role: 'button' })}
        className={`${inactive && 'inactive'} ${pressed && 'pressed'} ${bgColor || 'bg-white'} ${padding || 'p-2'} ${className} ${rounded || 'rounded-2xl'} ${hideWalls && 'hide-walls'} border-ink-800 relative z-1 border transition-transform [.hide-walls]:border-0 [.pressed]:translate-0.5`}
      >
        {children}
      </div>
      <div
        className={`${rounded || 'rounded-2xl'} ${wallColor || 'bg-ink-800'} ${hideWalls && 'hide-walls'} border-ink-800 absolute inset-x-0.5 inset-y-0.5 right-0 bottom-0 z-0 border [.hide-walls]:border-0`}
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
