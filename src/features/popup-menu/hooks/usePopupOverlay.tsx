import { useAtom } from 'jotai';
import { showPopupAtom, popupAtom } from '../stores/PopupAtom';
import { Popup } from '../types';

export const usePopupOverlay = () => {
  const [showPopup, setShowPopup] = useAtom(showPopupAtom);
  const [popup, setPopup] = useAtom<Popup>(popupAtom);

  function callPopup(popup: Popup) {
    setPopup(popup);
    setShowPopup(true);
  }

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
    callPopup,
  };
};
