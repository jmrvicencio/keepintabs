import { type MouseEvent } from 'react';

function Button({
  children,
  onClick: handleClick = (e: MouseEvent) => {},
}: {
  children?: any;
  onClick: (e: MouseEvent) => void | Promise<void>;
}) {
  const clickHandler = () => {};

  return (
    <button className="cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white" onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
