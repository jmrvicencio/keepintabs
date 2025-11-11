import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PopupMenu, showPopupAtom } from '../stores/PopupAtom';
import { useAtom } from 'jotai';
import { buttonHandleKeypress, buttonRole } from '@/util/buttonHandleKeypress';

import { X } from 'lucide-react';
import Panel from '../../../components/neubrutalist/Panel';
import { usePopupOverlay } from '../hooks/usePopupOverlay';
import { MainContentRefAtom } from '@/store/mainArea';

const Menu = ({ popup }: { popup: PopupMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [mainContentRef] = useAtom(MainContentRefAtom);
  const ref = popup.reference?.current?.getBoundingClientRect();
  const mainContainer = mainContentRef?.current;
  const menuRect = menuRef.current?.getBoundingClientRect();
  const mainRect = mainContentRef?.current?.getBoundingClientRect();
  const padding = 12;

  const [styleY, setStyleY] = useState<{ top?: number; bottom?: number }>({
    top: (ref?.bottom ?? 0) + (mainContentRef?.current?.scrollTop ?? 0),
  });

  const screen = {
    top: mainContainer?.scrollTop ?? 0,
    bottom: (mainContainer?.scrollTop ?? 0) + window.innerHeight,
    left: 0,
    right: window.innerWidth,
  };

  useLayoutEffect(() => {
    const isOverflowingY = (menuRect?.bottom ?? 0) + padding < screen.bottom;

    if (isOverflowingY) {
      setStyleY({
        top: (ref?.bottom ?? 0) + padding,
      });
    } else {
      setStyleY({
        bottom: 0 + padding,
      });
    }
  }, [popup.reference, menuRef.current, mainContentRef?.current]);

  // ----------------------------
  // Event Listeners
  // ----------------------------

  const handlePopupClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={menuRef}
      style={{
        ...styleY,
        right: screen.right - (ref?.right ?? 0),
      }}
      className="absolute flex min-w-40 flex-col gap-2 rounded-sm bg-white p-4"
      onClick={handlePopupClicked}
    >
      {popup.options.map((option, i) => (
        <div {...buttonRole(option.action)} key={i} className="cursor-pointer">
          {option.label}
        </div>
      ))}
    </div>
  );
};

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
        <div data-testid="popup-menu" className="rounded-2xl border border-black bg-white" onClick={handlePopupClicked}>
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
      <div data-testid="popup-overlay" className="absolute inset-0 z-40 bg-black/70" onClick={handleClose}>
        <Menu popup={popup} />
      </div>
    )
  ) : (
    <></>
  );
};

export default PopupOverlay;
