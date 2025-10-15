import { useAtom } from 'jotai';

import { showPopupAtom } from '../stores/PopupAtom';

const PopupMenu = () => {
  const [showPopup] = useAtom(showPopupAtom);

  console.log('popup menu re-render');

  return showPopup ? (
    <div className="absolute z-10 h-dvh w-dvw bg-black/70" id="testing">
      this is a popup menu
    </div>
  ) : (
    <></>
  );
};

export default PopupMenu;
