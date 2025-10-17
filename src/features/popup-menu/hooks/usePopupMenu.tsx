import { useAtom } from 'jotai';
import { showPopupAtom, popupAtom, type Popup } from '../stores/PopupAtom';

export const usePopupMenu = () => {
  const [showPopup, setShowPopup] = useAtom(showPopupAtom);
  const [popup, setPopup] = useAtom<Popup>(popupAtom);

  function resetPopup() {
    setShowPopup(false);
    setPopup({
      body: <></>,
    });
  }

  return {
    showPopup,
    setShowPopup,
    popup,
    setPopup,
    resetPopup,
  };
};
