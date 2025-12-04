import { memo, type ReactNode, MouseEvent } from 'react';
import PanelButton from '@/components/neubrutalist/PanelButton';

const FAB = ({
  onClick: handleClicked = (e: MouseEvent) => {},
  className,
  bgColor = 'bg-accent-600',
  children,
  dropOnClick = true,
}: {
  onClick?: (e: MouseEvent) => any;
  bgColor?: string;
  className?: string;
  children?: ReactNode;
  dropOnClick?: boolean;
}) => {
  return (
    <div className={className}>
      <PanelButton
        onClick={handleClicked}
        className="flex flex-row text-white"
        bgColor={bgColor}
        dropOnClick={dropOnClick}
      >
        {children}
      </PanelButton>
    </div>
  );
};

export default FAB;
