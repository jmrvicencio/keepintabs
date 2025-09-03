import { type ReactNode } from 'react';

const PopupOverlay = ({
  onClick: handleClicked = () => {},
  setShowSelf = () => {},
  children,
}: {
  onClick?: () => void;
  setShowSelf?: (val: boolean) => void;
  children?: ReactNode;
}) => {
  const handleSelfClicked = () => {
    setShowSelf(false);
    handleClicked();
  };

  return (
    <div onClick={handleSelfClicked} className="absolute inset-0 z-10">
      {children}
    </div>
  );
};

export default PopupOverlay;
