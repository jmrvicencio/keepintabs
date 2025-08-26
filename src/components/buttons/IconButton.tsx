import { type ReactNode } from 'react';

function IconButton({ children }: { children: ReactNode }) {
  return <div className="bg-accent-600 flex h-7 w-fit cursor-pointer items-center rounded-xl px-3">{children}</div>;
}

export default IconButton;
