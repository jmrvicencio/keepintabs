import { useAtom } from 'jotai';
import { showPopupAtom, popupAtom } from '../stores/PopupAtom';

export const usePopupMenu = () => {
  const [showPopup, setShowPopup] = useAtom(showPopupAtom);
  const [popup, setPopup] = useAtom(popupAtom);

  return {
    showPopup,
    setShowPopup,
    popup,
    setPopup,
  };
};
