import { useAtom } from 'jotai';
import { showPopupAtom, popupAtom, type PopupOverlay, PopupMenu } from '../stores/PopupAtom';

export const usePopupOverlay = () => {
  const [showPopup, setShowPopup] = useAtom(showPopupAtom);
  const [popup, setPopup] = useAtom<PopupOverlay | PopupMenu>(popupAtom);

  function resetPopup() {
    setShowPopup(false);
    setPopup({
      type: 'popup-overlay',
      body: <></>,
    });
  }

  function _setShowPopup(state: boolean) {
    setShowPopup(state);
  }

  return {
    showPopup,
    setShowPopup: _setShowPopup,
    popup,
    setPopup,
    resetPopup,
  };
};
