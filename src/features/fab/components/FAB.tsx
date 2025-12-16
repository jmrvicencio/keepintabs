import { memo, type ReactNode, MouseEvent } from 'react';
import PanelButton from '@/components/neubrutalist/PanelButton';

const FAB = ({
  onClick: handleClicked = (e: MouseEvent) => {},
  className,
  bgColor = 'bg-accent-600',
  children,
  dropOnClick = true,
  locked = false,
}: {
  onClick?: (e: MouseEvent) => any;
  bgColor?: string;
  className?: string;
  children?: ReactNode;
  dropOnClick?: boolean;
  locked?: boolean;
}) => {
  const color = `${locked && 'locked'} [.locked]:bg-ink-300 ${bgColor}`;

  return (
    <div className={className}>
      <PanelButton
        onClick={handleClicked}
        className={`flex flex-row text-white`}
        bgColor={color}
        dropOnClick={dropOnClick}
        locked={locked}
      >
        {children}
      </PanelButton>
    </div>
  );
};

export default FAB;
