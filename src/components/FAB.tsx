import { memo, type ReactNode, MouseEvent } from 'react';
import PanelButton from './neubrutalist/PanelButton';

const FAB = memo(
  ({
    onClick: handleClicked = (e: MouseEvent) => {},
    children,
  }: {
    onClick?: (e: MouseEvent) => any;
    children: ReactNode;
  }) => {
    return (
      <div className="absolute bottom-6 left-1/2 z-5 w-fit -translate-x-1/2">
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
  },
);

export default FAB;
