import { MouseEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { showPopupAtom } from '../stores/PopupAtom';
import { useAtom } from 'jotai';

import { X } from 'lucide-react';
import Panel from '../../../components/neubrutalist/Panel';
import { usePopupMenu } from '../hooks/usePopupMenu';

const PopupMenu = () => {
  const location = useLocation();
  const { showPopup, setShowPopup, popup } = usePopupMenu();

  useEffect(() => {
    setShowPopup(false);
  }, [location]);

  const handlePopupClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setShowPopup(false);
    if (popup.closeCallback) popup.closeCallback();
  };

  return showPopup ? (
    <div
      className="absolute z-40 flex h-dvh w-dvw items-center justify-center bg-black/70 px-2"
      id="testing"
      onClick={handleClose}
    >
      <div className="w-100 rounded-2xl border-1 border-black bg-white" onClick={handlePopupClicked}>
        <div className="border-ink-300/40 relative flex items-center justify-center border-b-1 p-4 font-semibold">
          {popup.title}
          <div
            className={`bg-accent-200 absolute right-2 cursor-pointer rounded-xl border-1 p-1`}
            onClick={handleClose}
          >
            <X />
          </div>
        </div>
        <div className="p-4">{popup.body}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PopupMenu;
