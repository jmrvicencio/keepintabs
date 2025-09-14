import { memo, type ReactNode } from 'react';

/**
 * A button meant to hold a
 */
const SmallButton = memo(
  ({
    children,
    onClick: handleClick = () => {},
    inactive = false,
  }: {
    children?: ReactNode;
    onClick?: () => void;
    inactive?: boolean;
  }) => {
    return (
      <div
        className={`${inactive && 'inactive'} [.inactive]:bg-charcoal-300 [.inactive]:text-charcoal-800 bg-accent-600 flex h-7 w-fit cursor-pointer items-center rounded-xl px-3`}
        onClick={inactive ? () => {} : handleClick}
      >
        {children}
      </div>
    );
  },
);

export default SmallButton;
