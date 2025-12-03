import { memo, type ReactNode, MouseEvent } from 'react';
import PanelButton from '@/components/neubrutalist/PanelButton';

const FAB = ({
  onClick: handleClicked = (e: MouseEvent) => {},
  className,
  children,
}: {
  onClick?: (e: MouseEvent) => any;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={className}>
      <PanelButton
        onClick={handleClicked}
        className="flex flex-row text-white"
        bgColor="bg-accent-600"
        dropOnClick={true}
      >
        {children}
      </PanelButton>
    </div>
  );
};

export default FAB;
