import { useAtom } from 'jotai';
import { showPopupAtom, popupAtom, type Popup } from '../stores/PopupAtom';

export const usePopupMenu = () => {
  const [showPopup, setShowPopup] = useAtom(showPopupAtom);
  const [popup, setPopup] = useAtom<Popup>(popupAtom);

  return {
    showPopup,
    setShowPopup,
    popup,
    setPopup,
  };
};
