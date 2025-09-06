import { memo, type ReactNode } from 'react';

/**
 * A button meant to hold a
 */
const SmallButton = memo(
  ({ children, onClick: handleClick = () => {} }: { children: ReactNode; onClick: () => void }) => {
    return (
      <div className="bg-accent-600 flex h-7 w-fit cursor-pointer items-center rounded-xl px-3" onClick={handleClick}>
        {children}
      </div>
    );
  },
);

export default SmallButton;
