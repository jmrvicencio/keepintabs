import { MouseEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { showPopupAtom } from '../stores/PopupAtom';
import { useAtom } from 'jotai';

import { X } from 'lucide-react';
import Panel from '../../../components/neubrutalist/Panel';
import { usePopupOverlay } from '../hooks/usePopupOverlay';

const PopupOverlay = () => {
  const location = useLocation();
  const { showPopup, setShowPopup, popup } = usePopupOverlay();

  useEffect(() => {
    setShowPopup(false);
  }, [location.pathname]);

  const handlePopupClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setShowPopup(false);
    if (popup.closeCallback) popup.closeCallback();
  };

  // if (showPopup) debugger;

  return showPopup ? (
    popup.type == 'popup-overlay' ? (
      <div
        data-testid="popup-overlay"
        className="absolute z-40 flex h-dvh w-dvw items-center justify-center bg-black/70 px-2"
        id="testing"
        onClick={handleClose}
      >
        <div
          data-testid="popup-menu"
          className="w-100 rounded-2xl border border-black bg-white"
          onClick={handlePopupClicked}
        >
          <div className="border-ink-300/40 relative flex items-center justify-center border-b p-4 font-semibold">
            {popup.title}
            <div
              className={`bg-accent-200 absolute right-2 cursor-pointer rounded-xl border p-1`}
              onClick={handleClose}
            >
              <X />
            </div>
          </div>
          <div className="p-4">{popup.body}</div>
        </div>
      </div>
    ) : (
      <div className="absolute inset-0 z-40 bg-black/70" onClick={handleClose}>
        {popup.options.map((option) => (
          <div>{option.label}</div>
        ))}
      </div>
    )
  ) : (
    <></>
  );
};

export default PopupOverlay;
