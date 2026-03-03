import { type MouseEvent } from 'react';

function Button({
  children,
  type = 'button',
  onClick: handleClick = (e: MouseEvent) => {},
}: {
  children?: any;
  type?: 'button' | 'reset' | 'submit';
  onClick: (e: MouseEvent) => void | Promise<void>;
}) {
  const clickHandler = () => {};

  return (
    <button
      type={type}
      className="bg-accent-600 cursor-pointer rounded-lg border-2 border-black px-4 py-2 text-white"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
